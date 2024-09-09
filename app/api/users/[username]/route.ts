// // app/api/users/[username]/route.ts
// import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';
// import redisClient from '@/lib/cache/redis-cache';


// const prisma = new PrismaClient();

// export async function GET(request: Request, { params }: { params: { username: string } }) {
//   const { username } = params;
//   const cacheKey = `user:${username}:projects`;

//   try {
//      // Check Redis cache first
//      const cachedUser = await redisClient.get(cacheKey);

//      if (cachedUser) {
//       console.log('Cache Hit:', JSON.parse(cachedUser));  // Log cache hit
//        return NextResponse.json(JSON.parse(cachedUser));
//      }

//     const user = await prisma.user.findUnique({
//       where: {
//         name: username
//       },
//       select: {
//         id: true,
//         name: true,  // Ensure this is included
//         email: true, // Ensure this is included
//         projects: true,  // Including projects as well
//       },
//     });

//     if (!user) {
//       return NextResponse.json({ error: 'User not found' }, { status: 404 });
//     }


//     // Cache the result in Redis
//     await redisClient.setEx(cacheKey, 3600, JSON.stringify(user)); //cache for 1 hour
//     console.log('Data stored in Redis:', user);  // Log data stored in Redis

//     return NextResponse.json(user);
//   } catch (error) {
//     console.error('Error fetching user:', error);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }














// app/api/users/[username]/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import redisClient from '@/lib/cache/redis-cache';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { username: string } }) {
  const { username } = params;
  const cacheKey = `user:${username}:projects`;

  try {
    let user = null;

    // Try to fetch from Redis cache first
    try {
      const cachedUser = await redisClient.get(cacheKey);

      if (cachedUser) {
        console.log('Cache Hit:', JSON.parse(cachedUser));  // Log cache hit
        return NextResponse.json(JSON.parse(cachedUser));
      }
    } catch (redisError) {
      console.error('Redis fetch error:', redisError); // Log Redis error
      // Continue to the database fetch if Redis fails
    }

    // If no cache, fetch from the database
    try {
      user = await prisma.user.findUnique({
        where: {
          name: username,
        },
        select: {
          id: true,
          name: true,  // Ensure this is included
          email: true, // Ensure this is included
          projects: true,  // Including projects as well
        },
      });

      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      // Cache the result in Redis with an expiration time (1 hour)
      try {
        await redisClient.setEx(cacheKey, 3600, JSON.stringify(user)); // Cache for 1 hour
        console.log('Data stored in Redis:', user);  // Log data stored in Redis
      } catch (redisSetError) {
        console.error('Redis set error:', redisSetError); // Log Redis set error
        // Even if caching fails, continue to return the response from DB
      }

      // Return the data from the database
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
