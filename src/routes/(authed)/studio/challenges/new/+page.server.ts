import { base } from "$app/paths";
import { challengesRepo } from "$lib/contexts/challenges/repo";
import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import { superValidate } from "sveltekit-superforms/client";
import { z } from "zod";

const createChallengeSchema = z.object({
  name: z.string().nonempty(),
  url: z.string().nonempty().regex(/^[a-zA-Z0-9_-]*$/),
  description: z.string()
});


/** @type {import('./$types').PageServerLoad} */
export const load: PageServerLoad = (_event) => {
  const form = superValidate(createChallengeSchema);
  
  return { form };
}

export const actions: Actions = {
  create: async ({ request, locals }) => {
    const form = await superValidate(request, createChallengeSchema);

    if (!form.valid) {
      return fail(400, { form });
    }

    const { channel, user } = locals;

    // parse json data
    const { name, url, description } = form.data;
    const parsedDescription = JSON.parse(description)
    // const parsedPrompt = JSON.parse(form.data.prompt)

    const newChallenge = await challengesRepo.create({
      creator_id: user.id,
      channel_id: channel.id,
      name: name,
      url: url,
      description: parsedDescription,
      prompt: {}
    });

    throw redirect(303, `${base}/studio/challenges`);

    return { form };
  }
}