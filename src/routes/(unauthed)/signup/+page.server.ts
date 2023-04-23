import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import type { IInputMessage } from '$lib/components/InputMessages.svelte';
import { base } from '$app/paths';
import { run } from '$lib/prisma';
import { hash } from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { HASH_ROUNDS } from '$env/static/private';
import { env } from '$env/dynamic/private';
import type { ErrorMessage } from '$lib/types';

const usernameValidator = (value: FormDataEntryValue | null): ErrorMessage[] => {
	if (!value) {
		return [{ message: "Username cannot be empty"}];
	}
	let cValue = value as string;
	const validRegex =  /^[a-z0-9]+$/
	cValue = cValue.trim().toLowerCase()
	const errors = [];
	if (!cValue) {
		errors.push({ message: "Username cannot be empty"})
	}
	if (!validRegex.test(cValue)) {
		errors.push({ message: "Username can only contain number and letters"})
	}
	return errors
}

const passwordValidator = (value: FormDataEntryValue | null): ErrorMessage[] => {
	if (!value) {
		return [{ message: "Password cannot be empty" }]
	}
	const cValue = value as string;
	const minPasswordLen = parseInt(env.USERS_MIN_PASSWORD_LENGTH)
	const errors = [];
	if (cValue.length < minPasswordLen) {
		errors.push({ message: `Password must be at least ${minPasswordLen} characters long` });
	}
	return errors
}

const passwordConfirmationValidator = (value: FormDataEntryValue | null, password: string): ErrorMessage[] => {
	if (!value) {
		return [{ message: "Password confirmation cannot be empty"}]
	}
	const cValue = value as string;
	const errors = [];
	if (cValue !== password) {
		errors.push({ message: "Password and password confirmation must be the same"})
	}

	return errors
}

export const actions: Actions = {
	signup: async (event) => {
		const data = await event.request.formData();
	
		const usernameErrors = usernameValidator(data.get('username'));
		if (usernameErrors.length > 0) {
			return fail(400, { username: usernameErrors });
		}

		const password = data.get('password') as string;
		const passwordErrors = passwordValidator(data.get('password'));
		if (passwordErrors.length > 0) {
			return fail(400, { password: passwordErrors });
		}
		const passwordConfirmationErrors = passwordConfirmationValidator(data.get('passwordConfirmation'), password);
		if (passwordConfirmationErrors.length > 0) {
			return fail(400, { passwordConfirmation: passwordConfirmationErrors });
		}


		try {
			const username = data.get('username') as string;
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
