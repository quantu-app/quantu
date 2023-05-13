import { run } from '$lib/prisma';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const user = await run((client) =>
		client.user.findUnique({ where: { username: event.params.username } })
	);
	if (!user) {
		throw error(404);
	}
	const { user: currentUser } = await event.parent();

	return {
		isYou: currentUser.id === user?.id,
		user
	};
};
