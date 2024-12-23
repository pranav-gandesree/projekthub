import { NextResponse } from 'next/server';
import prisma from '@/prisma/prisma'

export async function GET(req: Request) {
  // Extract the user ID from query params, session, or headers
  const url = new URL(req.url);
  const userId = url.searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId },
          { recipientId: userId },
        ],
      },
      include: {
        sender: true,
        recipient: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const contactsMap: { [key: string]: any } = {};

    messages.forEach((message) => {
      const otherUser = message.senderId === userId ? message.recipient : message.sender;
      if (!contactsMap[otherUser.id]) {
        contactsMap[otherUser.id] = {
          id: otherUser.id,
          name: otherUser.name || 'Unknown User',
          avatar: otherUser.image || '/default-avatar.png',
          lastMessage: {
            content: message.content,
            timestamp: message.createdAt.toISOString(),
          },
        };
      }
    });

    const contacts = Object.values(contactsMap);
    return NextResponse.json(contacts, { status: 200 });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 });
  }
}
