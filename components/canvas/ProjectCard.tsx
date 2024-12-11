"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  GitHubLogoIcon,
  GlobeIcon,
  TrashIcon,
  LockClosedIcon,
} from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/badge";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface Tag {
  id: number;
  name: string;
}

interface ProjectCardProps {
  title: string;
  userId: string;
  description: string;
  githubLink: string;
  liveLink: string;
  tags?: Tag[];
  isPublic: boolean;
  image?: string;
  isAuthenticated: boolean;
  onDelete: () => void;
  onEdit: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  githubLink,
  liveLink,
  tags = [],
  isPublic,
  image,
  onEdit,
  isAuthenticated,
  onDelete,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="w-full max-w-sm"
    >
      <Card className="overflow-hidden bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-gray-700 shadow-xl backdrop-blur-md">
        <div className="relative h-48 overflow-hidden">
          {image ? (
            <motion.img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <div className="h-48 bg-gradient-to-br from-purple-600 to-blue-600"></div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
          <div className="absolute top-2 right-2 flex space-x-2">
            {isAuthenticated && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-2 rounded-full text-white hover:bg-purple-800/80 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <circle cx="12" cy="5" r="1.5" />
                      <circle cx="12" cy="12" r="1.5" />
                      <circle cx="12" cy="19" r="1.5" />
                    </svg>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-800 text-gray-200">
                  <DropdownMenuItem
                    onClick={onEdit}
                    className="flex items-center space-x-2 px-3 py-2 hover:bg-gray-700 rounded cursor-pointer"
                  >
                    ✏️ <span>Edit</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={onDelete}
                    className="flex items-center space-x-2 px-3 py-2 hover:bg-red-600 rounded cursor-pointer"
                  >
                    🗑️ <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        <CardHeader className="relative z-10 -mt-12 pb-0">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold text-white  truncate">
              {title}
            </CardTitle>
            {!isPublic && (
              <Badge variant="secondary" className="bg-gray-700 text-gray-200">
                <LockClosedIcon className="w-3 h-3 mr-1" />
                Private
              </Badge>
            )}
          </div>
          <CardDescription className="text-gray-300 line-clamp-2">
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-4">
          <div className="flex flex-wrap gap-2 mt-2">
            <AnimatePresence>
              {tags.map((tag) => (
                <motion.span
                  key={tag.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="bg-gray-700/50 text-gray-200 px-2 py-1 rounded-full text-xs font-medium"
                >
                  {tag.name}
                </motion.span>
              ))}
            </AnimatePresence>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between gap-4 pt-0">
          <Button
            variant="default"
            className="flex-1 bg-violet-600 text-white border-none hover:text-white"
            asChild
          >
            <a href={githubLink} target="_blank" rel="noopener noreferrer">
              <GitHubLogoIcon className="mr-2 h-4 w-4" />
              Source
            </a>
          </Button>
          <Button
            className="flex-1 ml-2 bg-white text-slate-900 border-none hover:bg-none hover:text-white"
            asChild
          >
            <a href={liveLink} target="_blank" rel="noopener noreferrer">
              <GlobeIcon className="mr-2 h-4 w-4" />
              Live Link
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
