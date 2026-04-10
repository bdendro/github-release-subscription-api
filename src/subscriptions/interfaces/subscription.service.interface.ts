import { SubscriptionResponseDTO } from '../dto/subscription.response.dto';
import { SubscribeBody } from '../schemas/subscription.schema';

export interface SubscriptionServiceInterface {
  subscribe(subscribeBody: SubscribeBody): Promise<void>;
  confirm(token: string): Promise<void>;
  unsubscribe(token: string): Promise<void>;
  getSubscriptionsByEmail(email: string): Promise<SubscriptionResponseDTO[]>;
}
