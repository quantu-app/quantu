import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { IInputMessage } from '$lib/components/InputMessages.svelte';
import { base } from '$app/paths';
import { run } from '$lib/prisma';
import { hash } from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { HASH_ROUNDS } from '$env/static/private';
import { env } from '$env/dynamic/private';

export const actions: Actions = {
	signup: async (event) => {
		const data = await event.request.formData();
		const username = data.get('username') as string;
		if (!username) {
			return fail(400, { username: [{ type: 'error', value: 'missing' }] as IInputMessage[] });
		}
		const password = data.get('password') as string;
		if (!password) {
			return fail(400, { password: [{ type: 'error', value: 'missing' }] as IInputMessage[] });
		}
		if (password.length < 6) {
			return fail(400, { password: [{ type: 'error', value: 'too_short' }] as IInputMessage[] });
		}
		const passwordConfirmation = data.get('passwordConfirmation') as string;
		if (!passwordConfirmation) {
			return fail(400, {
				passwordConfirmation: [{ type: 'error', value: 'missing' }] as IInputMessage[]
			});
		}
		if (password !== passwordConfirmation) {
			return fail(400, {
				passwordConfirmation: [{ type: 'error', value: 'mismatch' }] as IInputMessage[]
			});
		}
		try {
			const encryptedPassword = await hash(password, +HASH_ROUNDS);
			const user = await run((client) =>
				client.user.create({ data: { username, encryptedPassword } })
			);
			event.cookies.set(
				'token',
				await jsonwebtoken.sign({ user_id: user.id }, env.JWT_SECRET, {
					expiresIn: env.JWT_EXPIRE_IN
				})
			);
		} catch (error) {
			console.error(error);
			return fail(500, {
				username: [{ type: 'error', value: 'server_error' }] as IInputMessage[]
			});
		}
		throw redirect(303, `${base}/`);
	}
};
