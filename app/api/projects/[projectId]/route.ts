import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";


export async function GET(req: Request, { params }: { params: { projectId: string } }) {
  const projectId = params.projectId;

  const id = parseInt(projectId, 10);
  if (isNaN(id)) {
    return NextResponse.json({ error: "Project ID must be a number" }, { status: 400 });
  }

  try {
    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


export async function PUT(req: Request, { params }: { params: { projectId: string } }) {
  const projectId = params.projectId;
  const id = parseInt(projectId, 10);

  if (isNaN(id)) {
    return NextResponse.json({ error: "Project ID must be a number" }, { status: 400 });
  }

  try {
    const data = await req.json();
    const updatedProject = await prisma.project.update({
      where: { id },
      data,
    });

    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
