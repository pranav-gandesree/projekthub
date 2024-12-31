import { NextResponse } from 'next/server';
import  prisma  from '@/prisma/prisma';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    // Get all unique conversations for the user
    const conversations = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: userId },
          { recipientId: userId },
        ],
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        recipient: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      distinct: ['senderId', 'recipientId'],
    });

    // Transform the conversations into contacts
    const contacts = conversations.map(conv => {
      const contact = conv.senderId === userId ? conv.recipient : conv.sender;
      return {
        id: contact.id,
        name: contact.name || 'Anonymous',
        avatar: contact.image || '/default-avatar.png',
        lastMessage: {
          content: conv.content,
          timestamp: conv.createdAt.toISOString(),
        },
      };
    });

    return NextResponse.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}