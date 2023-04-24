import { env } from '$env/dynamic/private';
import { toPublicUserJSON } from '$lib/contexts/users/presenters';
import { run } from '$lib/prisma';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import jsonwebtoken from 'jsonwebtoken';
const setUser: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('token') as string | undefined;
	if (token) {
		const { user_id } = (await jsonwebtoken.verify(token, env.JWT_SECRET)) as {
			user_id: number;
		};
		event.locals.user = await run(async (client) => { 
			const user = await client.user.findUnique({ where: { id: user_id }, rejectOnNotFound: true})
			return toPublicUserJSON(user);
		});
	}
	return resolve(event);
};

// TODO: set locale

export const handle = sequence(setUser)
