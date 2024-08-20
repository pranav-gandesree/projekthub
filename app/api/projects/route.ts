// app/api/projects/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/prisma/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, githubLink, liveLink, isPublic, userId} = body;

    const project = await prisma.project.create({
      data: {
        title,
        description,
        githubLink,
        liveLink,
        public: isPublic,
        userId, 
      },
    });

    return NextResponse.json({ project });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}