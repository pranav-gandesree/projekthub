import { z } from 'zod';
import { BookmarkCreateSchema, BookmarkDeleteSchema } from './schema';
import { ActionState } from '@/lib/create-safe-action';
import { Bookmark, Project, User } from '@prisma/client';

export type InputTypeCreateBookmark = z.infer<typeof BookmarkCreateSchema>;
export type ReturnTypeCreateBookmark = ActionState<
  InputTypeCreateBookmark,
  Bookmark
>;


export type InputTypeDeleteBookmark = z.infer<typeof BookmarkDeleteSchema>;
export type ReturnTypeDeleteBookmark = ActionState<
  InputTypeDeleteBookmark,
  Bookmark
>;

// Define the type for Bookmark with expanded relations
export type TBookmarkWithProject = Bookmark & {
  project: Project & {
    createdBy: User; // Include project creator details
  };
};

