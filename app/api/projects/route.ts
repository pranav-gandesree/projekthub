// app/api/projects/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/prisma/prisma';
import redisClient from '@/lib/cache/redis-cache';

export async function POST(request: Request) {
  const { title, description, image, liveLink, githubLink, public: isPublic, userId, tags, username } = await request.json();

  try {
    const createdTags = await Promise.all(
      tags.map(async (tag: string) => {
        return await prisma.tag.upsert({
          where: { name: tag },
          update: {},
          create: { name: tag },
        });
      })
    );

    const newProject = await prisma.project.create({
      data: {
        title,
        description,
        image,
        liveLink,
        githubLink,
        public: isPublic,
        userId,
        tags: {
          connect: createdTags.map(tag => ({ id: tag.id })),
        },
      },
    });
console.log(newProject)

    //   // Cache Update: User Projects
      const userProjectsCacheKey = `user:${username}:projects`;

        // Cache the result in Redis
    await redisClient.setEx(userProjectsCacheKey, 3600, JSON.stringify(newProject)); //cache for 1 hour
    console.log('succesfully created a proj and added in redis', newProject); 


      // Cache Update: Public Projects (if the project is public)
      if (isPublic) {
        const publicProjectsCacheKey = `publicProjects`;
        const cachedPublicProjects = await redisClient.get(publicProjectsCacheKey);
        if (cachedPublicProjects) {
          // const publicProjects = JSON.parse(cachedPublicProjects);
          // publicProjects.push(newProject);
          await redisClient.setEx(publicProjectsCacheKey, 3600, JSON.stringify(newProject));
        }
      }

    return NextResponse.json(newProject);
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}




// export async function GET() {
//   try {
//     const cacheKey = 'publicProjects';

//     // Check if the public projects are in the cache
//     const cachedProjects = await redisClient.get(cacheKey);

//     if (cachedProjects) {
//       // If cached, return the data from Redis
//       return NextResponse.json(JSON.parse(cachedProjects));
//     }

//     // If not cached, fetch from the database
//     const publicProjects = await prisma.project.findMany({
//       where: {
//         public: true, // Assuming `public` is the field name in your database
//       },
//       include: {
//         createdBy: true, // Include the user relation
//         tags: true,
//       },
//     });

//     // Store the result in Redis with an expiration time (e.g., 1 hour)
//     await redisClient.set(cacheKey, JSON.stringify(publicProjects), {
//       EX: 3600, // Expire in 1 hour (3600 seconds)
//     });

//     // Return the data
//     return NextResponse.json(publicProjects);
//   } catch (error) {
//     console.error('Error fetching public projects:', error);
//     return NextResponse.json({ error: 'Failed to fetch public projects' }, { status: 500 });
//   }
// }





export async function GET() {
  try {
    const cacheKey = 'publicProjects';

    let publicProjects = null;

    // Try to get cached projects from Redis
    try {
      const cachedProjects = await redisClient.get(cacheKey);
      if (cachedProjects) {
        // If cached, return the data from Redis
        return NextResponse.json(JSON.parse(cachedProjects));
      }
    } catch (redisError) {
      console.error('Redis fetch error:', redisError);
      // Continue to fetch from the database if Redis fails
    }

    // If not cached or Redis failed, fetch from the database
    try {
      publicProjects = await prisma.project.findMany({
        where: {
          public: true, // Assuming `public` is the field name in your database
        },
        include: {
          createdBy: true, // Include the user relation
          tags: true,
        },
      });

      // Store the result in Redis with an expiration time (e.g., 1 hour)
      try {
        await redisClient.set(cacheKey, JSON.stringify(publicProjects), {
          EX: 3600, // Expire in 1 hour (3600 seconds)
        });
      } catch (redisSetError) {
        console.error('Redis set error:', redisSetError);
        // If Redis set fails, log the error but don't break the response
      }

      // Return the data from the database
      return NextResponse.json(publicProjects);
    } catch (dbError) {
      console.error('Database fetch error:', dbError);
      return NextResponse.json({ error: 'Failed to fetch public projects from the database' }, { status: 500 });
    }
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Failed to fetch public projects' }, { status: 500 });
  }
}
