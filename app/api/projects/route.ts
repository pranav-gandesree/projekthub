// app/api/projects/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/prisma/prisma';
import redisClient from '@/lib/cache/redis-cache';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';

export async function POST(request: Request) {
  const { title, description, image, liveLink, githubLink, public: isPublic, userId, tags, username } = await request.json();

  console.log(title, description, image, liveLink, githubLink, isPublic, userId, tags, username)

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


    // //   // Cache Update: User Projects
    //   const userProjectsCacheKey = `user:${username}:projects`;

    //     // Cache the result in Redis
    // await redisClient.setEx(userProjectsCacheKey, 3600, JSON.stringify(newProject)); //cache for 1 hour
    // console.log('succesfully created a proj and added in redis', newProject); 


    //   // Cache Update: Public Projects (if the project is public)
    //   if (isPublic) {
    //     const publicProjectsCacheKey = `publicProjects`;
    //     const cachedPublicProjects = await redisClient.get(publicProjectsCacheKey);
    //     if (cachedPublicProjects) {
    //       // const publicProjects = JSON.parse(cachedPublicProjects);
    //       // publicProjects.push(newProject);
    //       await redisClient.setEx(publicProjectsCacheKey, 3600, JSON.stringify(newProject));
    //     }
    //   }

    return NextResponse.json(newProject);
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}







export async function GET() {
  try {
    const cacheKey = 'publicProjects';

    let publicProjects = null;

    // Try to get cached projects from Redis
    // try {
    //   const cachedProjects = await redisClient.get(cacheKey);
    //   if (cachedProjects) {
    //     // If cached, return the data from Redis
    //     return NextResponse.json(JSON.parse(cachedProjects));
    //   }
    // } catch (redisError) {
    //   console.error('Redis fetch error:', redisError);
    //   // Continue to fetch from the database if Redis fails
    // }

    // If not cached or Redis failed, fetch from the database
    try {
      publicProjects = await prisma.project.findMany({
        where: {
          public: true, 
        },
        include: {
          createdBy: true, // Include the user relation
          tags: true,
        },
      });

      // Store the result in Redis with an expiration time (e.g., 1 hour)
      // try {
      //   await redisClient.set(cacheKey, JSON.stringify(publicProjects), {
      //     EX: 3600, // Expire in 1 hour (3600 seconds)
      //   });
      // } catch (redisSetError) {
      //   console.error('Redis set error:', redisSetError);
      //   // If Redis set fails, log the error but don't break the response
      // }

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







export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }

  const { projectId } = await req.json(); // Assuming you're passing `projectId` in the body

  if (!projectId) {
    return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
  }

  try {
    // Fetch project to check if the logged-in user is the owner
    const project = await prisma.project.findUnique({
      where: { id: Number(projectId) },
    });
//@ts-ignore
    if (!project || project.userId !== session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Delete the project
    await prisma.project.delete({
      where: { id: Number(projectId) },
    });

    // Remove the project from Redis cache (user projects and public projects)
    //@ts-ignore
    const userProjectsCacheKey = `user:${session.user.name}:projects`;
    const publicProjectsCacheKey = `publicProjects`;

    // Optionally update the cached user and public projects here by removing the deleted project

    await redisClient.del(userProjectsCacheKey); // Invalidate the cache for user projects
    await redisClient.del(publicProjectsCacheKey); // Invalidate the public projects cache (if applicable)

    return NextResponse.json({ message: 'Project deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
