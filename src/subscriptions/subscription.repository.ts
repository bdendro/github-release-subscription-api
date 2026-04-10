import { ConflictError, NotFoundError } from '../common/utils/errors/custom-errors';
import { Prisma, PrismaClient, Subscription } from '../generated/prisma/client';

import { SubscriptionUpdateInput } from '../generated/prisma/models';
import { SUBSCRIPTION_ERROR_MESSAGES } from './constants/error-messages';
import { PRISMA_ERROR_CODES } from './constants/prisma-error-codes';
import { SubscriptionRepositoryInterface } from './interfaces/subscription.repository.interface';
import { SubscribeBody } from './schemas/subscription.schema';

export class SubscriptionRepository implements SubscriptionRepositoryInterface {
  constructor(private readonly prisma: PrismaClient) {}

  async getAll(): Promise<Subscription[]> {
    return await this.prisma.subscription.findMany();
  }

  async getSubscriptionsByEmail(email: string): Promise<Subscription[]> {
    return await this.prisma.subscription.findMany({ where: { email } });
  }

  async getSubscriptionByToken(token: string): Promise<Subscription> {
    const subscription = await this.prisma.subscription.findUnique({ where: { token } });
    if (!subscription) throw new NotFoundError(SUBSCRIPTION_ERROR_MESSAGES.NOT_FOUND);
    return subscription;
  }

  async create(subscriptionBody: SubscribeBody, token: string): Promise<Subscription> {
    try {
      return await this.prisma.subscription.create({
        data: { ...subscriptionBody, token },
      });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === PRISMA_ERROR_CODES.UNIQUE_CONSTRAINT) {
          throw new ConflictError(SUBSCRIPTION_ERROR_MESSAGES.UNIQUE_EMAIL_REPO);
        }
      }
      throw err;
    }
  }

  async updateByToken(token: string, update: SubscriptionUpdateInput): Promise<Subscription> {
    try {
      if ('token' in update && typeof update.token === 'string') {
        const subscription = await this.prisma.subscription.findUnique({
          where: { token: update.token },
        });
        if (subscription) throw new ConflictError(SUBSCRIPTION_ERROR_MESSAGES.UNIQUE_TOKEN);
      }
      return await this.prisma.subscription.update({ data: update, where: { token } });
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === PRISMA_ERROR_CODES.RECORD_NOT_FOUND) {
          throw new NotFoundError(SUBSCRIPTION_ERROR_MESSAGES.NOT_FOUND);
        }

        if (err.code === PRISMA_ERROR_CODES.UNIQUE_CONSTRAINT) {
          throw new ConflictError(SUBSCRIPTION_ERROR_MESSAGES.UNIQUE_EMAIL_REPO);
        }
      }
      throw err;
    }
  }

  async deleteByToken(token: string): Promise<void> {
    try {
      await this.prisma.subscription.delete({ where: { token } });
      return;
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
        throw new NotFoundError(SUBSCRIPTION_ERROR_MESSAGES.NOT_FOUND);
      }
      throw err;
    }
  }
}
