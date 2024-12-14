
import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  const {
    title,
    description,
    image,
    liveLink,
    githubLink,
    category,
    public: isPublic,
    userId,
    tags,
    username,
  } = await request.json();

  console.log(
    title,
    description,
    image,
    liveLink,
    githubLink,
    category,
    isPublic,
    userId,
    tags,
    username
  );

  try {
    const newProject = await prisma.project.create({
      data: {
        title,
        description,
        image,
        liveLink,
        githubLink,
        category,
        public: isPublic,
        userId,
        tags,
      },
    });
    console.log(newProject);

    return NextResponse.json(newProject);
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {

    let publicProjects = null;

    try {
      publicProjects = await prisma.project.findMany({
        where: {
          public: true,
        },
        include: {
          createdBy: true, 
        },
      });

      return NextResponse.json(publicProjects);
    } catch (dbError) {
      console.error("Database fetch error:", dbError);
      return NextResponse.json(
        { error: "Failed to fetch public projects from the database" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Failed to fetch public projects" },
      { status: 500 }
    );
  }
}



export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { projectId } = await req.json(); 

  if (!projectId) {
    return NextResponse.json(
      { error: "Project ID is required" },
      { status: 400 }
    );
  }

  try {

    const project = await prisma.project.findUnique({
      where: { id: Number(projectId) },
    });
    //@ts-ignore
    if (!project || project.userId !== session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // delete the project
    await prisma.project.delete({
      where: { id: Number(projectId) },
    });

    return NextResponse.json(
      { message: "Project deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting project:", error);
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    );
  }
}
