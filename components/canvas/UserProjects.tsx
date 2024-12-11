"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import ProjectCard from "./ProjectCard";
import { useSession } from "next-auth/react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { toast, Toaster } from "sonner";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import PageNotFound from "./PageNotFound";

interface Tag {
  id: number;
  name: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  githubLink: string;
  liveLink: string;
  public: boolean;
  image?: string;
  userId: string;
  tags: Tag[];
}

interface User {
  id: string;
  name: string;
  email?: string;
  projects?: Project[];
}

const UserProjects = ({ username }: { username: string }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {

    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/users/${username}`);
        const userData = response.data;

        const mappedProjects = userData.projects.map((project: any) => ({
          ...project,
          isPublic: project.public,
        }));

        // console.log( "mapped projects is ",mappedProjects);
        setUser({ ...userData, projects: mappedProjects });
      } catch (error) {
        setError("Error fetching user");
      }
    };

    fetchUser();
  }, [username]);
  

  const deleteProject = async () => {
    if (!selectedProjectId) return;

    try {
      const response = await axios.delete("/api/projects", {
        data: { projectId: selectedProjectId },
      });

      if (response.status === 200) {
        toast.success("Project deleted successfully!");
  
        setUser((prevUser) => {
          if (prevUser) {
            const updatedProjects = prevUser.projects?.filter(
              (project) => project.id !== selectedProjectId
            );
            return { ...prevUser, projects: updatedProjects };
          }
          return prevUser;
        });
      }
      router.refresh();
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project!");
    } finally {
      setIsOpen(false);
      setSelectedProjectId(null);
    }
  };

  const handleEdit = (projectId: number) => {
    router.push(`/${username}/projects/edit/${projectId}`);
  };

  const openDeleteDialog = (projectId: number) => {
    setSelectedProjectId(projectId);
    setIsOpen(true);
  };

  if (error) {
    return <PageNotFound/>;
  }



  if (!user) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5].map((_, index) => (
          <div key={index} className="p-4 border rounded-lg">
            <Skeleton className="h-40" />
            <div className="mt-4">
              <Skeleton />
              <Skeleton className="mt-2 h-6" />
              <Skeleton className="mt-2 h-6" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl mb-4">Your Projects</h2>
      <Toaster />
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              project from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
               onClick={(event) => {
                event.stopPropagation(); 
                setIsOpen(false);
                router.refresh();
              }}
              className="text-black"              
            >
              Cancel
            </AlertDialogCancel >
            <AlertDialogAction onClick={deleteProject}>
              Yes, Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {user.projects && user.projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {user.projects
            .filter(
              (project) => project.public || user.id === session?.user?.id
            )
            
            .map((project: any) => (
      
              <ProjectCard
                key={project.id}
                userId={project.userId}
                title={project.title}
                description={project.description}
                image={project?.image}
                githubLink={project.githubLink}
                liveLink={project.liveLink}
                isPublic={project.public}
                isAuthenticated={  project.userId === session?.user?.id}
                tags={project.tags}
                onDelete={() => openDeleteDialog(project.id)}
                onEdit= {()=>handleEdit(project.id)}
              />
            ))}
        </div>
      ) : (
        <div className="flex flex-col items-center mt-16 justify-center h-full p-4 rounded-md shadow-lg">
          <p className="text-lg text-gray-600 mb-4">No projects found.</p>
          <Button
            onClick={() => router.push("/new")}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-500 focus:outline-none focus:ring-2transition-all duration-150"
          >
            Add Project
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserProjects;




























