import { z } from 'zod';

export const BookmarkCreateSchema = z.object({
  projectId: z.number(),
});
export const BookmarkDeleteSchema = z.object({
  id: z.number(),
});