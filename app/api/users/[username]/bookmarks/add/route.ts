

import { NextResponse } from 'next/server';
import prisma from '@/prisma/prisma';

export async function POST(request: Request) {
  try {
    const { userId, projectId } = await request.json();

    await prisma.user.update({
      where: { id: userId },
      data: {
        bookmarks: {
          connect: { id: projectId },
        },
      },
    });

    return NextResponse.json({ message: 'Bookmark added successfully' });
  } catch (error) {
    console.error('Error adding bookmark:', error);
    return NextResponse.json({ error: 'Failed to add bookmark' }, { status: 500 });
  }
}
