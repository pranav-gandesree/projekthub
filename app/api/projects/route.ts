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


      // Cache Update: User Projects
      const userProjectsCacheKey = `user:${username}:projects`;
      const cachedUserProjects = await redisClient.get(userProjectsCacheKey);
      if (cachedUserProjects) {
        const projects = JSON.parse(cachedUserProjects);
        projects.push(newProject); // Add the new project to the cached list
        await redisClient.setEx(userProjectsCacheKey, 3600, JSON.stringify(projects));
        console.log(`Cache update successful for key: ${userProjectsCacheKey}`);
      }
  
      // Cache Update: Public Projects (if the project is public)
      if (isPublic) {
        const publicProjectsCacheKey = `publicProjects`;
        const cachedPublicProjects = await redisClient.get(publicProjectsCacheKey);
        if (cachedPublicProjects) {
          const publicProjects = JSON.parse(cachedPublicProjects);
          publicProjects.push(newProject);
          await redisClient.setEx(publicProjectsCacheKey, 3600, JSON.stringify(publicProjects));
        }
      }

    return NextResponse.json(newProject);
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}




export async function GET() {
  try {
    const cacheKey = 'publicProjects';

    // Check if the public projects are in the cache
    const cachedProjects = await redisClient.get(cacheKey);

    if (cachedProjects) {
      // If cached, return the data from Redis
      return NextResponse.json(JSON.parse(cachedProjects));
    }

    // If not cached, fetch from the database
    const publicProjects = await prisma.project.findMany({
      where: {
        public: true, // Assuming `public` is the field name in your database
      },
      include: {
        createdBy: true, // Include the user relation
        tags: true,
      },
    });

    // Store the result in Redis with an expiration time (e.g., 1 hour)
    await redisClient.set(cacheKey, JSON.stringify(publicProjects), {
      EX: 3600, // Expire in 1 hour (3600 seconds)
    });

    // Return the data
    return NextResponse.json(publicProjects);
  } catch (error) {
    console.error('Error fetching public projects:', error);
    return NextResponse.json({ error: 'Failed to fetch public projects' }, { status: 500 });
  }
}

