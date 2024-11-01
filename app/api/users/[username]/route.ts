
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import redisClient from '@/lib/cache/redis-cache';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { username: string } }) {
  const { username } = params;

  try {
    let user = null;


    // If no cache, fetch from the database
    try {
      user = await prisma.user.findUnique({
        where: {
          name: username,
        },
        select: {
          id: true,
          name: true,  
          email: true, 
          userDetails: { // Include userDetails relation here
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
              title: true,
              description: true,
              githubLink: true,
              liveLink: true,
              public: true,
              tags: {  // Include the tags relation here
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
      console.error('Database fetch error:', dbError); // Log database error
      return NextResponse.json({ error: 'Failed to fetch user data from database' }, { status: 500 });
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
