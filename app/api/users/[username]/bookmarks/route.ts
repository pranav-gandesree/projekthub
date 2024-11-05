

import { NextResponse } from 'next/server';
import prisma from '@/prisma/prisma'; 

export async function GET(request: Request, { params }: { params: { username: string } }) {
  const { username } = params;

  try {

    const user = await prisma.user.findUnique({
      where: { name: username },
      include: { bookmarks: { include: { createdBy: true } } },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const bookmarksWithCreator = user.bookmarks.map(bookmark => ({
      ...bookmark,
      creatorUsername: bookmark.createdBy.name,
    }));

    return NextResponse.json({
      username: user.name,
      bookmarks: bookmarksWithCreator,
    });
  } catch (error) {
    console.error('Error fetching bookmarks:', error);
    return NextResponse.json({ error: 'Failed to fetch bookmarks' }, { status: 500 });
  }
}
