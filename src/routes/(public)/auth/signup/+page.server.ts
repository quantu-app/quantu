import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { base } from '$app/paths';
import { ChannelMembershipRole, Prisma } from "@prisma/client";
import { transaction } from '$lib/prisma';
import { hash } from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { HASH_ROUNDS } from '$env/static/private';
import { env } from '$env/dynamic/private';
import { z } from 'zod';
import { superValidate, message } from 'sveltekit-superforms/server';

const USERNAME_REGEX = /^[a-z0-9]+$/;

const signUpSchema = z.object({
	email: z.string().email(),
	username: z.string().min(3).regex(USERNAME_REGEX),
	password: z.string().min(6),
	password_confirmation: z.string().min(6)
}).refine(({ password, password_confirmation }) => password !== password_confirmation, { 
	message: "Passwords do not match",
	path: ["password_confirmation"] 
});

export const load: PageServerLoad = async () => {
	const form = superValidate(signUpSchema);

	return { form };
}

export const actions: Actions = {
	signup: async ({ request, cookies }) => {
		const form = await superValidate(request, signUpSchema);

    if (!form.valid) {
      return fail(400, { form });
    }
		
		try {
			const { email, username, password } = form.data;
			const encrypted_password = await hash(password, +HASH_ROUNDS);
			const user = await transaction((client) => {
				return client.user.create({ 
					data: {
						username,
						encrypted_password,
						active: true,
						confirmed: false,
						creator: false,
						application_setting: {
							create: {
								locale: "en" // TODO: Set locale from user's primary browser language (if supported)
							}
						},
						emails: {
							create: {
								email: email,
								confirmed: true, // TODO: Add E-mail confirmation to part of sign up process
								primary: true
							}
						},
						channel_memberships: {
							create: {
								role: ChannelMembershipRole.OWNER,
								channel: {
									create: {
										name: username,
										uri: username
									}
								}
							}
						}
					}
				});
			});

			const token = await jsonwebtoken.sign({ user_id: user.id }, env.JWT_SECRET, {
				expiresIn: env.JWT_EXPIRE_IN
			});

			cookies.set('token', token, { path: "/" });

			throw redirect(303, `${base}/`);

		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				return message(form, "Something went wrong")
			}
			throw error
		}
	}
};
