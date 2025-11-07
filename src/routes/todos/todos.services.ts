import { db } from '@/db/db';
import { todos } from '@/db/schema';
import { NewTodo, Todo } from '@/types/todo.type';
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
