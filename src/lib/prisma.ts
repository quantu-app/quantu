import type { PrismaClient, Prisma } from '@prisma/client';
import prisma from '@prisma/client';
import type { MaybePromise } from '@sveltejs/kit/types/private';

const prismaConfig = {
	log:
		process.env.NODE_ENV === 'production'
			? (['error'] as Prisma.LogLevel[])
			: (['query', 'info', 'warn', 'error'] as Prisma.LogLevel[])
};

const client = new prisma.PrismaClient(prismaConfig);

export function run<T = void>(fn: (client: PrismaClient) => MaybePromise<T>): Promise<T> {
	return client
		.$connect()
		.then(() => fn(client))
		.finally(() => client.$disconnect());
}

export function transaction<T = void>(
	fn: (prisma: Prisma.TransactionClient) => Promise<T>
): Promise<T> {
	return run((client) => client.$transaction(fn));
}
