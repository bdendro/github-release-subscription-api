import { createApp } from './app';
import { createContainer } from './container';

async function bootstrap() {
  const container = createContainer();

  await container.prisma.$connect();
  console.log('Prisma connection established successfully');

  const app = createApp(container);

  // TODO: add env constant
  const server = app.listen(process.env.APP_PORT, () => {
    console.log(`Express server is listening on port ${process.env.APP_PORT}`);
  });

  async function shutdown() {
    console.log('Shutting down...');
    server.close();

    await container.prisma.$disconnect();

    console.log('Application shut down successfully.');
    process.exit(0);
  }

  process.on('SIGINT', () => {
    shutdown().catch((err) => {
      console.log('Shutdown failed.', err);
      process.exit(1);
    });
  });
  process.on('SIGTERM', () => {
    shutdown().catch((err) => {
      console.log('Shutdown failed.', err);
      process.exit(1);
    });
  });
}

bootstrap().catch((err) => {
  console.log('Failed to start application.', err);
  process.exit(1);
});
