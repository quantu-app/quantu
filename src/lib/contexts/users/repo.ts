import { run } from '$lib/prisma';
import type { User } from '@prisma/client';

const find = async (id: number): Promise<User> => {
  return await run(async (client) => { 
    const user = await client.user.findUnique({ 
      where: {
        id 
      },
      include: {
        emails: {
          where: {
            primary: true
          }
        }
      },
      rejectOnNotFound: true})
    return user
  });
}


export const usersRepo = { find };