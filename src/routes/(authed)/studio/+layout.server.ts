import { redirect } from '@sveltejs/kit';
import { channelsRepo } from '$lib/contexts/channels/repo';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ parent }) => {
	const { user } = await parent();

  const channel = await channelsRepo.findForUser(user.id);

	return {
		channel: channel
	};
};
