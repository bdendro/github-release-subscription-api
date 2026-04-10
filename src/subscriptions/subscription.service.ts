import { randomUUID } from 'node:crypto';
import { SubscriptionResponseDTO } from './dto/subscription.response.dto';
import { SubscriptionRepositoryInterface } from './interfaces/subscription.repository.interface';
import { SubscriptionServiceInterface } from './interfaces/subscription.service.interface';
import { SubscribeBody } from './schemas/subscription.schema';
import { NotFoundError } from '../common/utils/errors/custom-errors';
import { SUBSCRIPTION_ERROR_MESSAGES } from './constants/error-messages';

export class SubscriptionService implements SubscriptionServiceInterface {
  constructor(private readonly subscriptionRepository: SubscriptionRepositoryInterface) {}

  async subscribe(subscribeBody: SubscribeBody): Promise<void> {
    // const repo = 'repo' // todo: add github client

    const token = randomUUID();
    await this.subscriptionRepository.create(subscribeBody, token);

    // todo: add email provider

    return;
  }

  async confirm(token: string): Promise<void> {
    // todo: change logic
    const subscription = await this.subscriptionRepository.getSubscriptionByToken(token);
    if (!subscription) throw new NotFoundError(SUBSCRIPTION_ERROR_MESSAGES.NOT_FOUND);

    // todo: add email provider
    return;
  }

  async unsubscribe(token: string): Promise<void> {
    // todo: change logic
    const subscription = await this.subscriptionRepository.getSubscriptionByToken(token);
    if (!subscription) throw new NotFoundError(SUBSCRIPTION_ERROR_MESSAGES.NOT_FOUND);
    // todo: add email provider
    return;
  }

  async getSubscriptionsByEmail(email: string): Promise<SubscriptionResponseDTO[]> {
    const subscriptions = await this.subscriptionRepository.getSubscriptionsByEmail(email);
    return subscriptions.map((sub) => ({
      email: sub.email,
      repo: sub.repo,
      confirmed: sub.confirmed,
      last_seen_tag: sub.lastSeenTag,
    }));
  }
}
