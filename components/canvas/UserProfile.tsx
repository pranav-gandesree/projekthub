'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';

interface Project {
  id: number;
  title: string;
  description: string;
  githubLink: string;
  liveLink: string;
  isPublic: boolean;
  tags: string[];
}

interface User {
  name: string;
  email?: string;
  projects?: Project[];
}

const UserProfile = ({ username }: { username: string }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/users/${username}`);
        const userData = response.data;

        console.log("API Response:", userData);

          // Check if name and email exist in the API response
          if (!userData.name || !userData.email) {
            throw new Error("Name or email is missing in the API response");
          }

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
         <h1>{user.email}</h1>
         <p>Email: {user.name}</p>

        <h2>Projects:</h2>
        {user.projects && user.projects.length > 0 ? (
        <ul>
          {user.projects.map((project) => (
            <li key={project.id} className='border border-slate-300'>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <p><a href={project.githubLink} target="_blank" rel="noopener noreferrer">GitHub Link</a></p>
              <p><a href={project.liveLink} target="_blank" rel="noopener noreferrer">Live Link</a></p>
              <p>{project.isPublic ? 'Public' : 'Private'}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No projects found.</p>
      )} 
    </div>
  );
};

export default UserProfile;
