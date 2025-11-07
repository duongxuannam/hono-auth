import { auth } from '@/lib/auth';
import { IApp } from '@/types/app.type';
import { createMiddleware } from 'hono/factory';

const authMiddleware = createMiddleware<IApp>(async (c, next) => {
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });
  if (!session) {
    return c.json(
      {
        message: 'Unauthorized',
      },
      401,
    );
  }
  c.set('user', session.user);
  c.set('session', session.session);
  return next();
});

export { authMiddleware };
