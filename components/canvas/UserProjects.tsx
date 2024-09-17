'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectCard from './ProjectCard'; // Adjust the path as necessary
import { useSession } from 'next-auth/react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { toast, Toaster } from 'sonner';
import { Skeleton } from '../ui/skeleton';


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
  isPublic: boolean;
  image?: string;
  userId: string;
  tags: Tag[];
}

interface User {
  name: string;
  email?: string;
  projects?: Project[];
}

const UserProjects = ({ username }: { username: string }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/users/${username}`);
        const userData = response.data;

        const mappedProjects = userData.projects.map((project: any) => ({
          ...project,
          isPublic: project.public,
        }));

        console.log(mappedProjects)
        setUser({ ...userData, projects: mappedProjects });
      } catch (error) {
        setError('Error fetching user');
      }
    };

    fetchUser();
  }, [username]);

  const deleteProject = async () => {
    if (!selectedProjectId) return;

    try {
      const response = await axios.delete('/api/projects', {
        data: { projectId: selectedProjectId },
      });

      if (response.status === 200) {
        toast.success('Project deleted successfully!');
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
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project!');
    } finally {
      setIsOpen(false);
      setSelectedProjectId(null);
    }
  };

  const openDeleteDialog = (projectId: number) => {
    setSelectedProjectId(projectId);
    setIsOpen(true);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5].map((_, index) => (
          <div key={index} className="p-4 border rounded-lg">
            <Skeleton className='h-40'/> {/* Placeholder for image */}
            <div className="mt-4">
              <Skeleton  /> {/* Placeholder for title */}
              <Skeleton className="mt-2 h-6" /> {/* Placeholder for description */}
              <Skeleton  className="mt-2 h-6" /> {/* Placeholder for links */}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div>
      <h2 className='text-2xl mb-4'>Your Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Toaster />
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className='text-black'>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the project from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setIsOpen(false)} className='text-black'>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={deleteProject}>Yes, Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {user.projects && user.projects.length > 0 ? (
          user.projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              image={project?.image}
              githubLink={project.githubLink}
              liveLink={project.liveLink}
              isPublic={project.isPublic}
              isAuthenticated={project.userId === session?.user?.id}
              tags={project.tags}
              onDelete={() => openDeleteDialog(project.id)}
            />
          ))
        ) : (
          <p>No projects found.</p>
        )}
      </div>
    </div>
  );
};

export default UserProjects;











