import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

const createTodoSchema = z
  .object({
    title: z
      .string()
      .min(1, 'Title is required')
      .max(500, 'Title must be less than 500 characters'),
    desc: z
      .string()
      .max(1000, 'Description must be less than 1000 characters')
      .optional(),
    complete: z.boolean().default(false),
  })
  .strict();

const createTodoValidator = zValidator('json', createTodoSchema, (rs, c) => {
  if (!rs.success) {
    return c.json(
      {
        message: rs.error.issues.map((issue) => issue.message),
      },
      400,
    );
  }
});

export { createTodoValidator };
