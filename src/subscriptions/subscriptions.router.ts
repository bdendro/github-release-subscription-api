import { Router } from 'express';
import { SUBSCRIPTION_ROUTE_PATHS } from './constants/subscriptions.const';

export function createSubscriptionRouter(subscriptionController): Router {
  const router = Router();

  router.use(`/${SUBSCRIPTION_ROUTE_PATHS.SUBSCRIBE}`, () => {});

  router.use(`/${SUBSCRIPTION_ROUTE_PATHS.CONFIRM}/:${SUBSCRIPTION_ROUTE_PATHS.TOKEN}`, () => {});

  router.use(
    `/${SUBSCRIPTION_ROUTE_PATHS.UNSUBSCRIBE}/:${SUBSCRIPTION_ROUTE_PATHS.TOKEN}`,
    () => {},
  );

  router.use(`/${SUBSCRIPTION_ROUTE_PATHS.SUBSCRIPTIONS}`, () => {});

  return router;
}
