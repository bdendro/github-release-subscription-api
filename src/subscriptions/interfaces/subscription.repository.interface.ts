import { Prisma, Subscription } from '../../generated/prisma/client';
import { SubscribeBody } from '../schemas/subscription.schema';

export interface SubscriptionRepositoryInterface {
  getAll(): Promise<Subscription[]>;
  getSubscriptionsByEmail(email: string): Promise<Subscription[]>;
  getSubscriptionByToken(token: string): Promise<Subscription | null>;
  create(subscriptionBody: SubscribeBody, token: string): Promise<Subscription>;
  updateByToken(
    token: string,
    update: Prisma.SubscriptionUpdateInput,
  ): Promise<Subscription | null>;
  deleteByToken(token: string): Promise<Subscription | null>;
}
