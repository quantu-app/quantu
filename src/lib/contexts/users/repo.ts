import { run } from '$lib/prisma';
import type { PrismaClient, User, Email } from '@prisma/client';

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

const findByEmail = async (email: string): Promise<User> => {
  return await run(async (client) => {
    const emailWithUser = await client.email.findFirst({
      where: {
        primary: true,
        email: email,
        confirmed: true
      },
      include: {
        user: true
      },
      rejectOnNotFound: true
    });

    return emailWithUser.user;
  })
}


export const usersRepo = { find, findByEmail };