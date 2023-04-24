import { fail, redirect } from '@sveltejs/kit';
import { run } from '$lib/prisma';
import type { Actions } from './$types';
import { compare } from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { env } from '$env/dynamic/private';
import { base } from '$app/paths';

export const actions: Actions = {
	signin: async (event) => {
		const data = Object.fromEntries(await event.request.formData());
		const username = data.username as string;
		const password = data.password as string;

		const failMessage = { global: [{ message: "Username or password is incorrect" }]}
	

		if (!username || !password) {
			return fail(400, failMessage)
		}

		const user = await run((client) => client.user.findUnique({ where: { username } }));
		if (!user || !(await compare(password, user.encryptedPassword))) {
			return fail(400, failMessage);
		}

		event.cookies.set(
			'token',
			await jsonwebtoken.sign({ user_id: user.id }, env.JWT_SECRET, {
				expiresIn: env.JWT_EXPIRE_IN
			})
		);
		throw redirect(303, `${base}/`);
	}
};
