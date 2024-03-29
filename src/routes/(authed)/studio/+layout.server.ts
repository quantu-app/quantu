import { channelsRepo } from '$lib/contexts/channels/repo';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async (event) => {
	const { user } = await event.parent();

  const channel = await channelsRepo.findForUser(user.id);

	event.locals.channel = channel;

	return {
		channel: channel
	};
};
