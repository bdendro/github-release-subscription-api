import express, { Application, NextFunction, Request, Response } from 'express';
import { AppContainer } from './container';
import { createRouter } from './routes';

export function createApp(container: AppContainer): Application {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/api', createRouter());

  app.use((_req: Request, res: Response, _next: NextFunction) => {
    res.status(404).json({ message: 'Not Found' });
  });

  return app;
}
