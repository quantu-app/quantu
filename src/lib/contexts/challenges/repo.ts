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

const create = async (params: ChallengeCreateParams): Promise<Challenge> => {
  return await run( async (client) => {
    const newChallenge = await client.challenge.create({
      data: {
        owner_id: params.owner_id,
        channel_id: params.channel_id,
        name: params.name,
        url: params.url,
        prompt: params.prompt,
        description: params.description
      }
    })
    return newChallenge
  });
}

export const challengesRepo = {
  findAllForChannel,
  create
}