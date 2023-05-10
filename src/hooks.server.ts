import { env } from '$env/dynamic/private';
import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import jsonwebtoken, { TokenExpiredError } from 'jsonwebtoken';
import { usersRepo } from '$lib/contexts/users/repo';
import { channelsRepo } from '$lib/contexts/channels/repo';
import { toPublicUserJSON } from '$lib/contexts/users/presenters';
import { toPublicChannelView } from '$lib/contexts/channels/presenters';
import { Prisma } from '@prisma/client';
import { InactiveUserError } from "$lib/contexts/users/errors";

const setUserFromToken: Handle = async ({ event, resolve }) => {

	const token = event.cookies.get('token') as string | undefined;

	if (token) {
		try { 

			const { user_id } = (await jsonwebtoken.verify(token, env.JWT_SECRET)) as {
				user_id: number;
			};

			const user = await usersRepo.find(user_id)

			if (!user.active) {
				throw new InactiveUserError()
			}

			event.locals.user = toPublicUserJSON(user);

		} catch (error) {
			if (error instanceof TokenExpiredError) {
				event.cookies.delete("token")
			} else if (error instanceof Prisma.PrismaClientKnownRequestError) {
				// user with the token could not be found 
				event.cookies.delete("token");
			} else {
				throw error
			}
		}
	}

	return await resolve(event);
};

const setActiveChannel: Handle = async ({ event, resolve }) => {
	const { user } = event.locals;

	if (user) {

			const userChannel = await channelsRepo.findForUser(user.id);

			event.locals.channel = toPublicChannelView(userChannel);

	}

	return resolve(event);
};

export const handle = sequence(setUserFromToken, setActiveChannel)
