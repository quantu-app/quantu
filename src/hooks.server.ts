import { env } from '$env/dynamic/private';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import jsonwebtoken, { TokenExpiredError } from 'jsonwebtoken';
import { usersRepo } from '$lib/contexts/users/repo';
import { toPublicUserJSON } from '$lib/contexts/users/presenters';

const setUser: Handle = async ({ event, resolve }) => {

	const token = event.cookies.get('token') as string | undefined;

	if (token) {
		try { 
			const { user_id } = (await jsonwebtoken.verify(token, env.JWT_SECRET)) as {
				user_id: number;
			};
			const user = await usersRepo.find(user_id)
			event.locals.user = toPublicUserJSON(user);
		} catch (error) {
			if (error instanceof TokenExpiredError) {
				event.cookies.delete("token")
				// TODO: should we redirect here?
			} else {
				throw error
			}
		}
	}
	return resolve(event);
};

// TODO: set locale

export const handle = sequence(setUser)
