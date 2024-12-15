

import { NextResponse } from 'next/server';
import prisma from '@/prisma/prisma'; 

export async function GET(request: Request, { params }: { params: { username: string } }) {
  const { username } = params;

  try {

    const user = await prisma.user.findUnique({
      where: { name: username },
      include: {
        bookmarks: {
          include: {
            project: true, 
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const bookmarksWithProjects = user.bookmarks.map((bookmark) => ({
      bookmarkId: bookmark.id,
      projectId: bookmark.projectId,
      projectName: bookmark.project.title,
      projectDescription: bookmark.project.description,
      projectLiveLink: bookmark.project.liveLink,
      projectGithubLink: bookmark.project.githubLink,
      projectImage: bookmark.project?.image,
      createdAt: bookmark.createdAt,
      projectTags: bookmark.project.tags
    }));

    return NextResponse.json({
      username: user.name,
      bookmarks: bookmarksWithProjects,
    });
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    return NextResponse.json({ error: 'Failed to fetch bookmarks' }, { status: 500 });
  }
}
