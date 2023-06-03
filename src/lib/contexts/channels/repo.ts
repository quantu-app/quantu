import { run, transaction } from '$lib/prisma';
import { ChannelMembershipRole, type Channel } from '@prisma/client';
import { UserNotCreatorError } from '$lib/contexts/users/errors';
import type { ChannelCreateParams } from './types';

const find = async (id: number): Promise<Channel> => {
  return await run(async (client) => { 
    return await client.channel.findFirstOrThrow({ 
      where: {
        id 
      }
    });
  });
}

const findForUser = async (user_id: number): Promise<Channel> => {
  return await run(async (client) => { 

    const channelMembership = await client.channelMembership.findFirst({ 
      where: {
        user_id: user_id
      },
      select: {
        channel: true
      },
      rejectOnNotFound: true
    })

    return channelMembership.channel
  });
}

const findAllForUser = async (user_id: number): Promise<Channel[]> => {
  return await run(async (client) => { 
    const channels = await client.channel.findMany({ 
      where: { 
        channel_memberships: {
          some: {
            user_id: user_id
          }
        }
      }
    });
    return channels
  });
}

const isUserOwner = async (channel_id: number, user_id: number): Promise<boolean> => {
  return await run(async (client) => { 
    const channel = await client.channelMembership.findUniqueOrThrow({ 
      where: {
        user_id: user_id,
        channel_id: channel_id,
        role: ChannelMembershipRole.OWNER
      }
    })
    return (channel !== null && channel) ? true : false
  });
}

const create = async (params: ChannelCreateParams): Promise<Channel> => {
  return await transaction(async (client) => {
    const user = await client.user.findUniqueOrThrow({ where: { id: params.owner_id }})
    if (!user.creator) {
      throw new UserNotCreatorError()
    }

    const channel = await client.channel.create({ 
      data: {
        name: params.name,
        uri: params.uri,
        channel_memberships: {
          create: {
            user_id: user.id,
            role: params.role
          }
        }
      }
    })
    
    return channel;
  }); 
}


export const channelsRepo = {
  find,
  findForUser,
  findAllForUser,
  isUserOwner,
  create
};