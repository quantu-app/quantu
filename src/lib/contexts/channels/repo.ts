import { run } from '$lib/prisma';
import { ChannelMembershipRole, type Channel } from '@prisma/client';

const find = async (id: number): Promise<Channel> => {
  return await run(async (client) => { 
    const channel = await client.channel.findUnique({ where: { id }, rejectOnNotFound: true})
    return channel
  });
}

const isUserOwner = async (channel_id: number, user_id: number): Promise<boolean> => {
  return await run(async (client) => { 
    const channel = await client.channelMembership.findUnique({ 
      where: {
        user_id: user_id,
        channel_id: channel_id,
        role: ChannelMembershipRole.OWNER
      }
    })
    return (channel !== null && channel) ? true : false
  });
}


export const channelsRepo = { find, isUserOwner };