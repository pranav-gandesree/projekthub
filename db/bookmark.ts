import db from "@/prisma/prisma"
import { TBookmarkWithProject } from '@/actions/bookmark/types';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// Fetch bookmarks with detailed project and creator information
export const getBookmarksWithProjects = async (): Promise<
  TBookmarkWithProject[] | { error: string }
> => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!userId) {
    return { error: 'Unauthorized' };
  }

  return await db.bookmark.findMany({
    where: {
      userId,
    },
    include: {
      project: {
        include: {
          createdBy: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

