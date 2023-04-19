import { env } from '$env/dynamic/private';
import { run } from '$lib/prisma';
import type { Handle } from '@sveltejs/kit';
import jsonwebtoken from 'jsonwebtoken';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('token') as string | undefined;
	if (token) {
		const { user_id } = (await jsonwebtoken.verify(token, env.JWT_SECRET)) as {
			user_id: number;
		};
		event.locals.user = await run((client) => client.user.findUnique({ where: { id: user_id } }));
	}
	return resolve(event);
};
