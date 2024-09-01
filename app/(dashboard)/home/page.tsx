'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  id: number;
  name: string;
}


interface Project {
  id: number;
  title: string;
  description: string;
  githubLink: string;
  liveLink: string;
  image: string | null;
  isPublic: boolean;
  createdBy: User; 
}

const HomePage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('/api/projects');
        console.log(response.data)
        setProjects(response.data);
      } catch (error) {
        setError('Failed to fetch public projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Public Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length > 0 ? (
          projects.map((project) => (
            <div key={project.id} className="border border-slate-300 rounded-lg shadow-lg p-4 bg-white transition-transform transform hover:scale-105">
              {project.image && (
                <img
                  src={project.image}
                  alt={`${project.title} thumbnail`}
                  className="w-full h-40 object-cover rounded-t-lg mb-4"
                />
              )}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <p className="text-gray-500 mb-4">Posted by: {project.createdBy.name || 'Unknown'}</p>
              <div className="space-y-2">
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  GitHub Link
                </a>
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No public projects found.</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
