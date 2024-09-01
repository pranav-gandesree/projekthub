'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectCard from './ProjectCard'; // Adjust the path as necessary

interface Project {
    id: number;
    title: string;
    description: string;
    githubLink: string;
    liveLink: string;
    isPublic: boolean;
    image: string
  }
  
  interface User {
    name: string;
    email?: string;
    projects?: Project[];
  }
  

const UserProjects = ({ username }: { username: string }) => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const response = await axios.get(`/api/users/${username}`);
          const userData = response.data;
  
          // Map the `public` field to `isPublic`
          const mappedProjects = userData.projects.map((project: any) => ({
            ...project,
            isPublic: project.public,
          }));
  
          setUser({ ...userData, projects: mappedProjects });
          console.log({ ...userData, projects: mappedProjects });
        }  catch (error) {
          setError('Error fetching user');
        }
      };
  
      fetchUser();
    }, [username]);
  
    if (error) {
      return <div>{error}</div>;
    }
  
    if (!user) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
<h2>Projects:</h2>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
