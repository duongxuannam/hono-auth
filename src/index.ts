import { Hono } from 'hono';
import { auth } from './lib/auth';
import { cors } from 'hono/cors';

const app = new Hono();
app.use(
  '*',
  cors({
    origin: 'http://localhost:3000', // replace with your origin
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: true,
  }),
);

app
  .on(['POST', 'GET'], '/api/auth/**', (c) => auth.handler(c.req.raw))
  .get('/', (c) => {
    return c.text('Hello Worlds1!');
  })
  .get('/second', (c) => {
    return c.text('Hello 2!');
  });

export default app;
