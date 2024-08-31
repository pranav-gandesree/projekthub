import React from 'react';
import { Github, ExternalLink } from 'lucide-react'

interface ProjectCardProps {
  title: string;
  description: string;
  image?: string;
  githubLink: string;
  liveLink: string;
  isPublic: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  image,
  githubLink,
  liveLink,
  isPublic,
}) => {
  return (
    <div className="border border-slate-300 rounded-lg shadow-lg p-4 bg-white transition-transform transform hover:scale-105">
      {image && (
        <img
          src={image}
          alt={`${title} thumbnail`}
          className="w-full h-40 object-cover rounded-t-lg mb-4"
        />
      )}
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="space-y-2">
        <a
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          GitHub Link
        </a>
        {/* <a
          href={liveLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Live Link
        </a> */}
        <ExternalLink size={16} />
        <span>Live Demo</span>
      </div>
      <p className="mt-4 text-sm text-gray-500">
        {isPublic ? 'Public' : 'Private'}
      </p>
    </div>
  );
};

export default ProjectCard;
