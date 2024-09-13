// app/api/users/[username]/bookmarks/route.ts

import { NextResponse } from 'next/server';
import prisma from '@/prisma/prisma'; // Adjust this import based on your setup

export async function GET(request: Request, { params }: { params: { username: string } }) {
  const { username } = params;

  try {
    // Fetch the user by username
    const user = await prisma.user.findUnique({
      where: { name: username }, // Use 'name' for the username field based on your schema
      include: { bookmarks: { include: { createdBy: true } } },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

 // Map bookmarks to include the creator's username
    const bookmarksWithCreator = user.bookmarks.map(bookmark => ({
      ...bookmark,
      creatorUsername: bookmark.createdBy.name, // Add the creator's username to each bookmark
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
