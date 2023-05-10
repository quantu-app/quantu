import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { compare } from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { env } from '$env/dynamic/private';
import { base } from '$app/paths';
import { usersRepo } from '$lib/contexts/users/repo';
import { z } from "zod";
import { superValidate, message } from 'sveltekit-superforms/server';
import { Prisma } from '@prisma/client';


const signInSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6)
})

export const load: PageServerLoad = async () => {
	const form = superValidate(signInSchema);

	return { form };
}

export const actions: Actions = {
	signin: async ({ request, cookies }) => {
		const form = await superValidate(request, signInSchema);

    if (!form.valid) {
      return fail(400, { form });
    }

		try {
			const user = await usersRepo.findByEmail(form.data.email);

			if (!user || !(await compare(form.data.password, user.encrypted_password))) {
				return message(form, 'Email or password is incorrect')
			}

			const token = jsonwebtoken.sign({ user_id: user.id }, env.JWT_SECRET, { 
				expiresIn: env.JWT_EXPIRE_IN
			})
			cookies.set('token', token, { path: '/' });
		
			throw redirect(303, `${base}/`);

		} catch (error) {
			// NotFoundError
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				return message(form, "Something went wrong")
			}
			
			throw error
		}
	}
};
