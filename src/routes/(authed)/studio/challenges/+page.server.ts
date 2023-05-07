import { challengesRepo } from "$lib/contexts/challenges/repo";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({parent}) => {
  const data = await parent()

  const challenges = await challengesRepo.findAllForChannel(data.channel.id);

  return {
    challenges: challenges
  }
}