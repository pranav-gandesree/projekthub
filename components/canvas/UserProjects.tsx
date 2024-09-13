'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectCard from './ProjectCard'; // Adjust the path as necessary
import { useSession } from 'next-auth/react';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { toast, Toaster } from 'sonner';

interface Project {
  id: number;
  title: string;
  description: string;
  githubLink: string;
  liveLink: string;
  isPublic: boolean;
  image?: string;
  userId: string;
  tags: string[];
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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Projects:</h2>
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



















// 'use client'

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import ProjectCard from './ProjectCard'; // Adjust the path as necessary
// import { useSession } from 'next-auth/react';
// import {
//   AlertDialog,
//   AlertDialogTrigger,
//   AlertDialogContent,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogCancel,
//   AlertDialogAction,
// } from '@/components/ui/alert-dialog';
// import { toast, Toaster } from 'sonner';

// interface Project {
//   id: number;
//   title: string;
//   description: string;
//   githubLink: string;
//   liveLink: string;
//   isPublic: boolean;
//   image?: string;
//   userId: string; // Ensure this is included to compare with session user
//   tags: string[];
// }

// interface User {
//   name: string;
//   email?: string;
//   projects?: Project[];
// }

// const UserProjects = ({ username }: { username: string }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const { data: session } = useSession();
//   const [isOpen, setIsOpen] = useState(false); // To handle the dialog state
//   const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null); // To store the project to delete

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get(`/api/users/${username}`);
//         const userData = response.data;

//         // Map the `public` field to `isPublic`
//         const mappedProjects = userData.projects.map((project: any) => ({
//           ...project,
//           isPublic: project.public,
//         }));

//         setUser({ ...userData, projects: mappedProjects });
//       } catch (error) {
//         setError('Error fetching user');
//       }
//     };

//     fetchUser();
//   }, [username]);

//   const deleteProject = async () => {
//     if (!selectedProjectId) return;

//     try {
//       const response = await axios.delete('/api/projects', {
//         data: { projectId: selectedProjectId }, // Send projectId as data in the request body
//       });

//       if (response.status === 200) {
//         toast.success('Project deleted successfully!');

//         // Filter out the deleted project from the state
//         setUser((prevUser) => {
//           if (prevUser) {
//             const updatedProjects = prevUser.projects?.filter(
//               (project) => project.id !== selectedProjectId
//             );
//             return { ...prevUser, projects: updatedProjects };
//           }
//           return prevUser;
//         });
//       }
//     } catch (error) {
//       console.error('Error deleting project:', error);
//       toast.error('Failed to delete project!');
//     } finally {
//       setIsOpen(false); // Close the dialog after the action
//       setSelectedProjectId(null); // Clear the selected project ID
//     }
//   };

//   const openDeleteDialog = (projectId: number) => {
//     setSelectedProjectId(projectId);
//     setIsOpen(true);
//   };

//   if (error) {
//     return <div>{error}</div>;
//   }

//   if (!user) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h2>Projects:</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         <Toaster /> {/* Add the Toaster component to show notifications */}
//         <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
//           <AlertDialogContent>
//             <AlertDialogHeader>
//               <AlertDialogTitle className='text-black'>Are you absolutely sure?</AlertDialogTitle>
//               <AlertDialogDescription>
//                 This action cannot be undone. This will permanently delete the project from our servers.
//               </AlertDialogDescription>
//             </AlertDialogHeader>
//             <AlertDialogFooter>
//               <AlertDialogCancel onClick={() => setIsOpen(false)} className='text-black'>Cancel</AlertDialogCancel>
//               <AlertDialogAction onClick={deleteProject}>Yes, Delete</AlertDialogAction> {/* Calls delete function */}
//             </AlertDialogFooter>
//           </AlertDialogContent>
//         </AlertDialog>

//         {user.projects && user.projects.length > 0 ? (
//           user.projects.map((project) => (
//             <ProjectCard
//               key={project.id}
//               title={project.title}
//               description={project.description}
//               image={project?.image}
//               githubLink={project.githubLink}
//               liveLink={project.liveLink}
//               isPublic={project.isPublic}
//               isAuthenticated={project.userId === session?.user.id} // Show delete button only for owner
//               tags={project.tags}
//               onDelete={() => openDeleteDialog(project.id)} // Open the confirmation dialog
//             />
//           ))
//         ) : (
//           <p>No projects found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserProjects;
