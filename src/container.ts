import { createPrismaClient, DBClient } from './config/prisma';

export type ContainerOverrides = Partial<{
  prisma: DBClient;
}>;

export function createContainer(overrides?: ContainerOverrides) {
  // TODO: add env constant
  const prisma = overrides?.prisma || createPrismaClient(process.env.DATABASE_URL || '');

  return { prisma };
}

export type AppContainer = ReturnType<typeof createContainer>;
