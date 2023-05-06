import { channelsRepo } from "$lib/contexts/channels/repo";
import { usersRepo } from "$lib/contexts/users/repo";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({parent}) => {
  const data = await parent()

  const channels = channelsRepo.findAllForUser()


  return {
    foo: fullUser
  }
}