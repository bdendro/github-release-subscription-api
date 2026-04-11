import { randomUUID } from 'node:crypto';
import { SubscriptionResponseDTO } from './dto/subscription.response.dto';
import { SubscriptionRepositoryInterface } from './interfaces/subscription.repository.interface';
import { SubscriptionServiceInterface } from './interfaces/subscription.service.interface';
import { SubscribeBody } from './schemas/subscription.schema';
import { NotFoundError } from '../common/utils/errors/custom-errors';
import { SUBSCRIPTION_ERROR_MESSAGES } from './constants/error-messages';
import { EmailServiceInterface } from '../email/interfaces/email.service.interface';

export class SubscriptionService implements SubscriptionServiceInterface {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepositoryInterface,
    private readonly emailService: EmailServiceInterface,
  ) {}

  async subscribe(subscribeBody: SubscribeBody): Promise<void> {
    // const repo = 'repo' // todo: add github client

    const token = randomUUID();
    await this.subscriptionRepository.create(subscribeBody, token);

    await this.emailService.sendConfirmationEmail(subscribeBody.email, token);
  }

  async confirm(token: string): Promise<void> {
    const subscription = await this.subscriptionRepository.updateByToken(token, {
      confirmed: true,
    });
    if (!subscription) throw new NotFoundError(SUBSCRIPTION_ERROR_MESSAGES.NOT_FOUND);

    await this.emailService.sendConfirmationSuccessEmail(subscription.email, token);

    return;
  }

  async unsubscribe(token: string): Promise<void> {
    const subscription = await this.subscriptionRepository.deleteByToken(token);
    if (!subscription) throw new NotFoundError(SUBSCRIPTION_ERROR_MESSAGES.NOT_FOUND);

    await this.emailService.sendUnsubscribeSuccessEmail(subscription.email);

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
