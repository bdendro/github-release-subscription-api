import { Response } from 'express';
import { SubscriptionControllerInterface } from './interfaces/subscription.controller.interface';
import { ValidatedRequest } from '../common/types/validated-request';
import { SubscribeBody, SubscriptionsQuery, TokenParams } from './schemas/subscription.schema';
import { ParamsDictionary } from 'express-serve-static-core';

export class SubscriptionController implements SubscriptionControllerInterface {
  async subscribe(req: ValidatedRequest<SubscribeBody>, res: Response): Promise<void> {
    await Promise.resolve();
    res.json(req.validated);
  }

  async confirm(req: ValidatedRequest<unknown, TokenParams>, res: Response): Promise<void> {
    await Promise.resolve();
    res.json(req.validated);
  }

  async unsubscribe(req: ValidatedRequest<unknown, TokenParams>, res: Response): Promise<void> {
    await Promise.resolve();
    res.json(req.validated);
  }

  async getSubscriptionsByEmail(
    req: ValidatedRequest<unknown, ParamsDictionary, SubscriptionsQuery>,
    res: Response,
  ): Promise<void> {
    await Promise.resolve();
    res.json(req.validated);
  }
}
