import { Env } from './config/env';
import { createPrismaClient, DBClient } from './config/prisma';
import { SubscriptionController } from './subscriptions/subscription.controller';
import { SubscriptionRepository } from './subscriptions/subscription.repository';
import { SubscriptionService } from './subscriptions/subscription.service';

export type ContainerOverrides = Partial<{
  prisma: DBClient;
}>;

export function createContainer(env: Env, overrides?: ContainerOverrides) {
  const prisma = overrides?.prisma || createPrismaClient(env.DATABASE_URL);

  const subscriptionRepository = new SubscriptionRepository(prisma);
  const subscriptionService = new SubscriptionService(subscriptionRepository);
  const subscriptionController = new SubscriptionController(subscriptionService);

  return { prisma, controllers: { subscriptionController }, service: { subscriptionService } };
}

export type AppContainer = ReturnType<typeof createContainer>;
