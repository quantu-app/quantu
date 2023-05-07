import { base } from "$app/paths";
import { challengesRepo } from "$lib/contexts/challenges/repo";
import { redirect, type Actions } from "@sveltejs/kit";

/** @type {import('./$types').PageServerLoad} */
export const load: PageServerLoad = ({locals}) => {
  console
  return {
      user: locals.user,
      channel: locals.channel
  };
}

export const actions: Actions = {
  create: async ({ parent, params, request, locals }) => {
    const { channel, user } = locals;
    const data = await request.formData();
    const name = data.get("name") as string;
    const uri = data.get("uri") as string;
    const description = JSON.parse(data.get("description"));

    console.log(channel, user,  data.get("description"));

    const newChallenge = await challengesRepo.create({
      creator_id: user.id,
      channel_id: channel.id,
      name: name,
      uri: uri,
      description: description
    });

    throw redirect(303, `${base}/studio/challenges`);
  }
}