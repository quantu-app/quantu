import { usersRepo } from "$lib/contexts/users/repo";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({parent}) => {
  const data = await parent()

  const fullUser = usersRepo.find(data.user.id)


  return {
    foo: fullUser
  }
}