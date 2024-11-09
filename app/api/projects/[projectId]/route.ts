import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/prisma/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { projectId } = req.query;
  
  // Ensure projectId is a single string
  if (!projectId || Array.isArray(projectId)) {
    return res.status(400).json({ error: "Invalid project ID" });
  }

  // Convert projectId to number
  const id = parseInt(projectId, 10);
  
  // Validate if id is a valid number
  if (isNaN(id)) {
    return res.status(400).json({ error: "Project ID must be a number" });
  }

  if (req.method === "GET") {
    try {
      const project = await prisma.project.findUnique({
        where: { id },
      });

      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      res.status(200).json(project);
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else if (req.method === "PUT") {
    try {
      const updatedProject = await prisma.project.update({
        where: { id },
        data: req.body,
      });

      res.status(200).json(updatedProject);
    } catch (error) {
      console.error("Error updating project:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}