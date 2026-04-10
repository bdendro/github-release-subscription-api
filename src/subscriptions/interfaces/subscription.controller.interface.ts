import { Response } from 'express';
import type { ParamsDictionary } from 'express-serve-static-core';
import { ValidatedRequest } from '../../common/types/validated-request';
import { SubscribeBody, SubscriptionsQuery, TokenParams } from '../schemas/subscription.schema';

export interface SubscriptionControllerInterface {
  subscribe(req: ValidatedRequest<SubscribeBody>, res: Response): Promise<void>;
  confirm(req: ValidatedRequest<unknown, TokenParams>, res: Response): Promise<void>;
  unsubscribe(req: ValidatedRequest<unknown, TokenParams>, res: Response): Promise<void>;
  getSubscriptionsByEmail(
    req: ValidatedRequest<unknown, ParamsDictionary, SubscriptionsQuery>,
    res: Response,
  ): Promise<void>;
}
