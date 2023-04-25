import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { base } from '$app/paths';
import { run } from '$lib/prisma';
import { hash } from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { HASH_ROUNDS } from '$env/static/private';
import { env } from '$env/dynamic/private';
import type { ErrorMessage } from '$lib/types';
import { getMessageFormatter, locale } from 'svelte-i18n';

const usernameValidator = (value: string): ErrorMessage[] => {
	const validRegex =  /^[a-z0-9]+$/
	value = value.trim().toLowerCase()
	if (!validRegex.test(value)) {
		return [{ message: "Username can only contain number and letters"}]
	} else {
		return []
	}
}

const passwordValidator = (value: string): ErrorMessage[] => {
	const minPasswordLen = parseInt(env.USERS_MIN_PASSWORD_LENGTH)
	if (value.length < minPasswordLen) {
		return [{ message: `Password must be at least ${minPasswordLen} characters long` }];
	} else {
		return []
	}
}

const passwordConfirmationValidator = (value: string, password: string): ErrorMessage[] => {
	if (value !== password) {
		return [{ message: "Password and password confirmation must be the same"}]
	} else {
		return []
	}
}

export const actions: Actions = {
	signup: async (event) => {
		// GET DATA
		const data = Object.fromEntries(await event.request.formData());
		const username = data.username as string;
		const password = data.password as string;
		const passwordConfirmation = data.passwordConfirmation as string;

		// TODO: How do we translate server side
		const result = getMessageFormatter("forms.empty_field", ).format({ field: "Username"})

		if (!username) { return fail(422, { username: [{ message: result as string }] }) }
		if (!password) { return fail(422, { password: [{ message: "Password cannot be empty"}] }) }
		if (!passwordConfirmation) { return fail(422, { passwordConfirmation: [{ message: "Password confirmation cannot be empty"}] }) }
	
		const usernameErrors = usernameValidator(username);
		if (usernameErrors.length > 0) {
			return fail(400, { username: usernameErrors });
		}

		const passwordErrors = passwordValidator(password);
		if (passwordErrors.length > 0) {
			return fail(400, { password: passwordErrors });
		}
		const passwordConfirmationErrors = passwordConfirmationValidator(
			data.passwordConfirmation as string, password);
		if (passwordConfirmationErrors.length > 0) {
			return fail(400, { passwordConfirmation: passwordConfirmationErrors });
		}


		try {
			const encryptedPassword = await hash(password, +HASH_ROUNDS);
			const user = await run((client) => {
				const newUser = client.user.create({ 
					data: {
						username,
						encryptedPassword,
						confirmed: false,
						applicationSettings: {
							create: {
								locale: "en" // TODO: Set locale from user's browser
							}
						}
					}
				})

				// TODO: Send confirmation Email

				return newUser;
			});
			event.cookies.set(
				'token',
				await jsonwebtoken.sign({ user_id: user.id }, env.JWT_SECRET, {
					expiresIn: env.JWT_EXPIRE_IN
				})
			);
		} catch (error) {
			// TODO: make this error generic
			return fail(500, {
				global: [{ message: "something went wrong" }]
			});
		}
		throw redirect(303, `${base}/`);
	}
};
