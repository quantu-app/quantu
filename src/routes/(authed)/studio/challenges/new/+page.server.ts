import { base } from "$app/paths";
import { channelsRepo } from "$lib/contexts/channels/repo";
import { ChannelMembershipRole } from "@prisma/client";
import { redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
  create: async ({ params, request, locals }) => {
    const data = await request.formData();
    const channelName = data.get("name") as string;
    const channelURI = data.get("uri") as string;

    console.log(channelName, channelURI)

    try {
      const newChannel = await channelsRepo.create({
        owner_id: locals.user.id,
        name: channelName, 
        uri: channelURI,
        role: ChannelMembershipRole.OWNER
      });
    } catch (error) {
      console.log(typeof(error), error.constructor.name);
    }

    
    throw redirect(303, `${base}/studio/channels`);
  }
}