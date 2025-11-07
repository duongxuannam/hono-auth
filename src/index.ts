import { Hono } from 'hono';
import { auth } from './lib/auth';
import { cors } from 'hono/cors';
import { IApp } from './types/app.type';
import { todos } from './routes/todos/todos.routes';
import { logger } from 'hono/logger';

const app = new Hono<IApp>();
app.use(logger());
app.use(
  '*',
  cors({
    origin: 'http://localhost:3000',
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['POST', 'GET', 'OPTIONS'],
    exposeHeaders: ['Content-Length'],
    maxAge: 600,
    credentials: true,
  }),
);

app
  .on(['POST', 'GET'], '/api/auth/**', (c) => auth.handler(c.req.raw))
  .route('/api/todos', todos)
  .get('/', (c) => {
    return c.text('Hello Worlds1!');
  });

export default app;
