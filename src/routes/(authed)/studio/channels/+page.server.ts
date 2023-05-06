import { channelsRepo } from "$lib/contexts/channels/repo";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({parent}) => {
  const data = await parent()

  const channels = await channelsRepo.findAllForUser(data.user.id);

  return {
    channels: channels
  }
}