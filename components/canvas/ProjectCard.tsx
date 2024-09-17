// 'use client'


// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { GitHubLogoIcon, GlobeIcon, TrashIcon, BookmarkIcon } from '@radix-ui/react-icons';
// import Bookmark from './Bookmark';

// interface Tag {
//   id: number;
//   name: string;
// }

// interface ProjectCardProps {
//   title: string;
//   description: string;
//   githubLink: string;
//   liveLink: string;
//   tags?: Tag[]; // Make tags optional
//   isPublic: boolean;
//   image?: string; 
//   isAuthenticated: boolean; // Check if the user is authenticated
//   onDelete: () => void; // Function to handle delete action
// }

// const ProjectCard: React.FC<ProjectCardProps> = ({
//   title,
//   description,
//   githubLink,
//   liveLink,
//   tags = [], // Default to empty array if not provided
//   isPublic,
//   isAuthenticated, // For authentication
//   onDelete, // Handle delete action
// }) => {
//   const [isHovered, setIsHovered] = useState(false);

//   // Function to generate random background image
//   const generateRandomImage = () => {
//     const images = [
//       "https://picsum.photos/400/300",
//     ];
//     return images[Math.floor(Math.random() * images.length)];
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       whileHover={{ scale: 1.05 }}
//       onHoverStart={() => setIsHovered(true)}
//       onHoverEnd={() => setIsHovered(false)}
//     >
//       <Card className="w-full max-w-md overflow-hidden relative">
//         <motion.div
//           animate={{ scale: isHovered ? 1.1 : 1 }}
//           transition={{ duration: 0.3 }}
//           className="relative h-48 overflow-hidden"
//         >
//           <motion.img
//             src={generateRandomImage()}
//             alt={title}
//             className="w-full h-full object-cover"
//             animate={{ scale: isHovered ? 1.1 : 1 }}
//             transition={{ duration: 0.3 }}
//           />
//         </motion.div>

//         <CardHeader className="flex flex-row justify-between items-center">
//           <div className="flex items-center">
//             <CardTitle className='text-slate-300'>{title}</CardTitle>
//           </div>

//           <div className="flex items-center space-x-2">
//             {isAuthenticated && (
//               <button
//                 className="text-red-500 hover:text-red-700"
//                 onClick={onDelete}
//               >
//                 <TrashIcon className="w-6 h-6" />
//               </button>
//             )}
//              <button className="text-blue-500 hover:text-blue-700">
//               <BookmarkIcon className="w-6 h-6" /> 
//             </button> 

          

//           </div>
//         </CardHeader>

//         <CardDescription className='ml-6'>{description}</CardDescription>

//         <CardContent>
//           <div className="flex flex-wrap gap-2 mt-2">
//             {tags.length > 0 ? (
//               tags.map(tag => (
//                 <span
//                   key={tag.id}
//                   className="bg-gray-700 text-gray-200 px-2 py-1 rounded"
//                 >
//                   {tag.name}
//                 </span>
//               ))
//             ) : (
//               <span>No tags available</span>
//             )}
//           </div>
//         </CardContent>

//         <CardFooter className="flex justify-start gap-2">
//           <Button variant="default" asChild className='hover:bg-purple-500'>
//             <a href={githubLink} target="_blank" rel="noopener noreferrer">
//               <GitHubLogoIcon className="mr-2 h-4 w-4" />
//               View Source
//             </a>
//           </Button>
//           <Button asChild className='hover:bg-purple-500'>
//             <a href={liveLink} target="_blank" rel="noopener noreferrer">
//               <GlobeIcon className="mr-2 h-4 w-4" />
//               Live Demo
//             </a>
//           </Button>
//         </CardFooter>
//       </Card>
//     </motion.div>
//   );
// };

// export default ProjectCard;



















'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GitHubLogoIcon, GlobeIcon, TrashIcon, BookmarkIcon, LockClosedIcon } from '@radix-ui/react-icons'
import { Badge } from "@/components/ui/badge"

interface Tag {
  id: number
  name: string
}

interface ProjectCardProps {
  title: string
  description: string
  githubLink: string
  liveLink: string
  tags?: Tag[]
  isPublic: boolean
  image?: string
  isAuthenticated: boolean
  onDelete: () => void
  // onBookmark: () => void
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  githubLink,
  liveLink,
  tags = [],
  isPublic,
  isAuthenticated,
  onDelete,
  // onBookmark,
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const generateRandomImage = () => {
    return `https://picsum.photos/seed/${title}/400/300`
  }

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
          <motion.img
            src={generateRandomImage()}
            alt={title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
          <div className="absolute top-2 right-2 flex space-x-2">
            {isAuthenticated && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-red-500/80 rounded-full text-white hover:bg-red-600/80 transition-colors"
                onClick={onDelete}
              >
                <TrashIcon className="w-4 h-4" />
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-blue-500/80 rounded-full text-white hover:bg-blue-600/80 transition-colors"
              // onClick={onBookmark}
            >
              <BookmarkIcon className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        <CardHeader className="relative z-10 -mt-12 pb-0">
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold text-white mb-1 truncate">{title}</CardTitle>
            {!isPublic && (
              <Badge variant="secondary" className="bg-gray-700 text-gray-200">
                <LockClosedIcon className="w-3 h-3 mr-1" />
                Private
              </Badge>
            )}
          </div>
          <CardDescription className="text-gray-300 line-clamp-2">{description}</CardDescription>
        </CardHeader>

        <CardContent className="pt-4">
          <div className="flex flex-wrap gap-2 mt-2">
            <AnimatePresence>
              {tags.map(tag => (
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

        <CardFooter className="flex justify-between gap-2 pt-0">
          <Button
            variant="default"
            // className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-none"
            className="flex-1 bg-violet-500 text-white border-none"
            asChild
          >
            <a href={githubLink} target="_blank" rel="noopener noreferrer">
              <GitHubLogoIcon className="mr-2 h-4 w-4" />
              Source
            </a>
          </Button>
          <Button
            // className="flex-1 bg-gradient-to-r from-pink-600 to-orange-600 hover:from-pink-700 hover:to-orange-700 text-white border-none"
            className="flex-1 bg-violet-500 text-white border-none"
            asChild
          >
            <a href={liveLink} target="_blank" rel="noopener noreferrer">
              <GlobeIcon className="mr-2 h-4 w-4" />
              Demo
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export default ProjectCard