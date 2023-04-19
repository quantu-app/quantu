import { fail, redirect } from '@sveltejs/kit';
import { run } from '$lib/prisma';
import type { Actions } from './$types';
import { compare } from 'bcrypt';
import type { IInputMessage } from '$lib/components/InputMessages.svelte';
import jsonwebtoken from 'jsonwebtoken';
import { env } from '$env/dynamic/private';
import { base } from '$app/paths';

export const actions: Actions = {
	signin: async (event) => {
		const data = await event.request.formData();
		const username = data.get('username') as string;
		if (!username) {
			return fail(400, { username: [{ type: 'error', value: 'missing' }] as IInputMessage[] });
		}
		const user = await run((client) => client.user.findFirst({ where: { username } }));
		const password = data.get('password') as string;
		if (!user || !(await compare(password, user.encryptedPassword))) {
			return fail(400, { username: [{ type: 'error', value: 'incorrect' }] as IInputMessage[] });
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
