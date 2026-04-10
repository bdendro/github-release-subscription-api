import { createPrismaClient, DBClient } from './config/prisma';
import { SubscriptionControllerInterface } from './subscriptions/interfaces/subscription.controller.interface';
import { SubscriptionController } from './subscriptions/subscription.controller';

export type ContainerOverrides = Partial<{
  prisma: DBClient;

  controllers: {
    subscriptionController: SubscriptionControllerInterface;
  };
}>;

export function createContainer(overrides?: ContainerOverrides) {
  // TODO: add env constant
  const prisma = overrides?.prisma || createPrismaClient(process.env.DATABASE_URL || '');

  const subscriptionController = new SubscriptionController();

  return { prisma, controllers: { subscriptionController } };
}

export type AppContainer = ReturnType<typeof createContainer>;
