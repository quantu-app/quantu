import { run } from '$lib/prisma';
import type { Challenge } from '@prisma/client';

const findAllForChannel = async (channel_id: number): Promise<Challenge[]> => {
  return await run(async (client) => { 

    const challenges = await client.challenge.findMany({ 
      where: {
        channel_id: channel_id
      }
    })

    return challenges
  });
}

export const challengesRepo = {
  findAllForChannel
}