import { channelsRepo } from "$lib/contexts/channels/repo";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({parent, params}) => {
  const { user } = await parent();
  const channel_id = parseInt(params.id)
  const channel = await channelsRepo.find(channel_id)
  const userOwnsChannel = channelsRepo.isUserOwner(channel_id, user.id); 


  return {
    channel: channel,
    is_owner: userOwnsChannel
  }
}