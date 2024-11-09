
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { username: string } }) {
  const { username } = params;

  try {
    let user = null;

    try {
      user = await prisma.user.findUnique({
        where: {
          name: username,
        },
        select: {
          id: true,
          name: true,  
          email: true, 
          userDetails: { 
            select: {
              twitter: true,
              github: true,
              portfolio: true,
              bio: true,
            },
          },
          projects: {
            select: {
              id: true,
              userId: true,
              title: true,
              description: true,
              image:true,
              githubLink: true,
              liveLink: true,
              public: true,
              tags: { 
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      });


      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      return NextResponse.json(user);
    } catch (dbError) {
      console.error('Database fetch error:', dbError); 
      return NextResponse.json({ error: 'Failed to fetch user data from database' }, { status: 500 });
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
