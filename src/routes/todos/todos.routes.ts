import { getTodosByUserId, insertTodo } from './todos.services';
import { authMiddleware } from '@/middlewares/auth.middleware';
import { IApp } from '@/types/app.type';
import { createTodoValidator } from '@/validators/todos/create-todo.validator';
import { Hono } from 'hono';

const todos = new Hono<IApp>();
todos.use(authMiddleware);

todos.get('/', async (c) => {
  const user = c.get('user');
  try {
    const todoList = await getTodosByUserId(user.id);
    return c.json(todoList);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return c.json(
      {
        message: 'Failed to get todo list',
      },
      500,
    );
  }
});

todos.post('/', createTodoValidator, async (c) => {
  const user = c.get('user');
  const todoData = c.req.valid('json');
  try {
    const newTodo = await insertTodo({ ...todoData, userId: user.id });
    return c.json(newTodo);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return c.json(
      {
        message: 'Failed to insert todo',
      },
      500,
    );
  }
});

export { todos };
