import { NewTodo, Todo } from '@/types/todo.type';
import { todos } from './schema';
import { db } from './db';
import { eq } from 'drizzle-orm';

const insertTodo = async (todo: NewTodo): Promise<Todo> => {
  const [result] = await db.insert(todos).values(todo).returning();
  return result;
};

const getTodosByUserId = async (userId: string): Promise<Todo[]> => {
  const result = await db
    .select()
    .from(todos)
    .where(eq(todos.userId, userId))
    .orderBy(todos.createdAt);
  return result;
};

export { insertTodo, getTodosByUserId };
