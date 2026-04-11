import { z } from 'zod';
import { ENV } from '../common/constants/env';

const envSchema = z.object({
  NODE_ENV: z.enum([ENV.DEVELOPMENT, ENV.TEST, ENV.PRODUCTION]).default(ENV.DEVELOPMENT),

  APP_NAME: z.string().min(1),
  APP_PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  APP_BASE_URL: z.url({ protocol: /^https?$/ }),

  DATABASE_URL: z.url({ normalize: true }).min(1),

  EMAIL: z.email(),
  EMAIL_PASSWORD: z.string().min(1),
  EMAIL_HOST: z.string().trim().min(1),
  EMAIL_PORT: z.coerce.number().int().min(1).max(65535),
  EMAIL_SECURE: z.stringbool({
    truthy: ['true'],
    falsy: ['false'],
    error: 'EMAIL_SECURE must be "true" or "false"',
  }),
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
