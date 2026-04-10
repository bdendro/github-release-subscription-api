import { z } from 'zod';
import { ENV } from '../common/constants/env';

const envSchema = z.object({
  NODE_ENV: z.enum([ENV.DEVELOPMENT, ENV.TEST, ENV.PRODUCTION]).default(ENV.DEVELOPMENT),

  APP_PORT: z.coerce.number().int().min(1).max(65535).default(3000),

  DATABASE_URL: z.url({ normalize: true }).min(1, 'DATABASE_URL is required'),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  const details = parsedEnv.error.issues
    .map((issue) => {
      const path = issue.path.join('.') || 'env';
      return `${path}: ${issue.message}`;
    })
    .join('\n');

  throw new Error(`Invalid environment variables:\n${details}`);
}

export const env = parsedEnv.data;
export type Env = z.output<typeof envSchema>;
