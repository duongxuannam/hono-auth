import { db } from '@/db/db';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { openAPI } from 'better-auth/plugins';
import { sendEmail } from './email';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      // await sendEmail({
      //   to: user.email,
      //   subject: 'Verify your email address',
      //   text: `Click the link to verify your email: ${url}`,
      // });
      await sendEmail({ user, url, token }, request);
    },
  },
  plugins: [openAPI()],
});
