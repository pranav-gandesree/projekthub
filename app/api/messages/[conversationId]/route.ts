// import { NextResponse } from 'next/server';
// import  prisma  from '@/prisma/prisma';

// export async function POST(req: Request) {
//   try {
//     const { senderId, recipientId, content } = await req.json();



//     const message = await prisma.message.create({
//       data: {
//         senderId,
//         recipientId,
//         content,
//       },
//       include: {
//         sender: true,
//         recipient: true,   
//       },
//     });


//     return NextResponse.json(message);
//   } catch (error) {
//     console.error('Error sending message:', error);
//     return NextResponse.json(
//       { error: 'Failed to send message' },
//       { status: 500 }
//     );
//   }
// }





// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const userId = searchParams.get('userId');
//     const contactId = searchParams.get('contactId');

//     if (!userId || !contactId) {
//       return NextResponse.json(
//         { error: 'Missing required parameters' },
//         { status: 400 }
//       );
//     }

//     const messages = await prisma.message.findMany({
//       where: {
//         OR: [
//           { AND: [{ senderId: userId }, { recipientId: contactId }] },
//           { AND: [{ senderId: contactId }, { recipientId: userId }] },
//         ],
//       },
//       include: {
//         sender: {
//           select: {
//             id: true,
//             name: true,
//             image: true,
//           },
//         },
//         recipient: {
//           select: {
//             id: true,
//             name: true,
//             image: true,
//           },
//         },
//       },
//       orderBy: {
//         createdAt: 'asc',
//       },
//     });

//     return NextResponse.json(messages);
//   } catch (error) {
//     console.error('Error fetching messages:', error);
//     return NextResponse.json(
//       { error: 'Failed to fetch messages' },
//       { status: 500 }
//     );
//   }
// }


















// app/api/messages/[conversationId]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/prisma';

// POST - Send a new message
export async function POST(
  request: NextRequest,
  { params }: { params: { conversationId: string } }
) {
  try {
    const { conversationId } = params;
    const [senderId, recipientId] = conversationId.split('-');
    
    // Get message content from request body
    const { content } = await request.json();
    
    if (!content) {
      return NextResponse.json(
        { error: 'Message content is required' },
        { status: 400 }
      );
    }

    // Create a message in the database
    const message = await prisma.message.create({
      data: {
        senderId,
        recipientId,
        content,
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
    });

    return NextResponse.json(message);
  } catch (error) {
    console.error('Error sending message:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}

// GET - Retrieve messages for a conversation
export async function GET(
  request: NextRequest,
  { params }: { params: { conversationId: string } }
) {
  try {
    const { conversationId } = params;
    const [userId, contactId] = conversationId.split('-');

    if (!userId || !contactId) {
      return NextResponse.json(
        { error: 'Invalid conversation ID format' },
        { status: 400 }
      );
    }

    // Fetch messages exchanged between the user and contact
    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { AND: [{ senderId: userId }, { recipientId: contactId }] },
          { AND: [{ senderId: contactId }, { recipientId: userId }] },
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
        createdAt: 'asc',
      },
    });

    return NextResponse.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}