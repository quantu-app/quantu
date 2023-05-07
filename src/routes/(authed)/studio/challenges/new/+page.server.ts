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
    const url = data.get("url") as string;
    const description = JSON.parse(data.get("description"));
    const prompt = JSON.parse(data.get("prompt"));

    const newChallenge = await challengesRepo.create({
      creator_id: user.id,
      channel_id: channel.id,
      name: name,
      url: url,
      description: description,
      prompt: prompt
    });

    throw redirect(303, `${base}/studio/challenges`);
  }
}