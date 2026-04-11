import { Env } from './config/env';
import { createPrismaClient, DBClient } from './config/prisma';
import { EmailProvider } from './email/email.provider';
import { EmailService } from './email/email.service';
import { EmailProviderInterface } from './email/interfaces/email.provider.interface';
import { GithubClient } from './github/github.client';
import { GithubService } from './github/github.service';
import { GithubClientInterface } from './github/interfaces/github.client.interface';
import { SubscriptionController } from './subscriptions/subscription.controller';
import { SubscriptionRepository } from './subscriptions/subscription.repository';
import { SubscriptionService } from './subscriptions/subscription.service';

export type ContainerOverrides = Partial<{
  prisma: DBClient;
  emailProvider: EmailProviderInterface;
  githubClient: GithubClientInterface;
}>;

export function createContainer(env: Env, overrides?: ContainerOverrides) {
  const prisma = overrides?.prisma || createPrismaClient(env.DATABASE_URL);

  const emailProvider = overrides?.emailProvider || new EmailProvider(env);
  const emailService = new EmailService(emailProvider);

  const githubClient = overrides?.githubClient || new GithubClient(env);
  const githubService = new GithubService(githubClient);

  const subscriptionRepository = new SubscriptionRepository(prisma);
  const subscriptionService = new SubscriptionService(
    subscriptionRepository,
    emailService,
    githubService,
  );
  const subscriptionController = new SubscriptionController(subscriptionService);

  return {
    prisma,
    emailProvider,
    controllers: { subscriptionController },
    services: { subscriptionService, emailService, githubService },
  };
}

export type AppContainer = ReturnType<typeof createContainer>;
