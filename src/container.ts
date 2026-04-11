import { Env } from './config/env';
import { createPrismaClient, DBClient } from './config/prisma';
import { EmailProvider } from './email/email.provider';
import { EmailService } from './email/email.service';
import { EmailProviderInterface } from './email/interfaces/email.provider.interface';
import { SubscriptionController } from './subscriptions/subscription.controller';
import { SubscriptionRepository } from './subscriptions/subscription.repository';
import { SubscriptionService } from './subscriptions/subscription.service';

export type ContainerOverrides = Partial<{
  prisma: DBClient;
  emailProvider: EmailProviderInterface;
}>;

export function createContainer(env: Env, overrides?: ContainerOverrides) {
  const prisma = overrides?.prisma || createPrismaClient(env.DATABASE_URL);

  const emailProvider = overrides?.emailProvider || new EmailProvider(env);
  const emailService = new EmailService(emailProvider);

  const subscriptionRepository = new SubscriptionRepository(prisma);
  const subscriptionService = new SubscriptionService(subscriptionRepository, emailService);
  const subscriptionController = new SubscriptionController(subscriptionService);

  return {
    prisma,
    emailProvider,
    controllers: { subscriptionController },
    services: { subscriptionService, emailService },
  };
}

export type AppContainer = ReturnType<typeof createContainer>;
