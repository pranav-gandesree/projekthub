// import { useState } from 'react'
// import { motion } from 'framer-motion'
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { GitHubLogoIcon, GlobeIcon, TrashIcon } from '@radix-ui/react-icons'

// interface ProjectCardProps {
//   title: string
//   description: string
//   githubLink: string
//   liveLink: string
//   tags: string[]
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
//   isPublic,
//   isAuthenticated, // For authentication
//   onDelete, // Handle delete action
// }) => {
//   const [isHovered, setIsHovered] = useState(false)

//   // Function to generate random background image
//   const generateRandomImage = () => {
//     const images = [
//       // "https://via.placeholder.com/400", // Placeholder image URLs
//       // "https://placekitten.com/400/300",
//       "https://picsum.photos/400/300",
//     ]
//     return images[Math.floor(Math.random() * images.length)]
//   }

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
//         <CardHeader>
//           <CardTitle className='text-slate-300'>{title}</CardTitle>
//           <CardDescription>{description}</CardDescription>
//         </CardHeader>
//         {isAuthenticated && (
//                     <button
//                         className="absolute top-3 right-3 text-red-500 hover:text-red-700"
//                         onClick={onDelete}
//                     >
//                         <TrashIcon className="w-6 h-6" />
//                     </button>
//                 )}

//         <CardContent>
//           {/* Tags section can be added here if needed */}
//         </CardContent>
//         <CardFooter className="flex justify-between">
//           <Button variant="outline" asChild>
//             <a href={githubLink} target="_blank" rel="noopener noreferrer">
//               <GitHubLogoIcon className="mr-2 h-4 w-4" />
//               View Source
//             </a>
//           </Button>
//           <Button asChild>
//             <a href={liveLink} target="_blank" rel="noopener noreferrer">
//               <GlobeIcon className="mr-2 h-4 w-4" />
//               Live Demo
//             </a>
//           </Button>
//         </CardFooter>
//       </Card>
//     </motion.div>
//   )
// }

// export default ProjectCard;














import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GitHubLogoIcon, GlobeIcon, TrashIcon, BookmarkIcon } from '@radix-ui/react-icons' // Imported Bookmark Icon

interface ProjectCardProps {
  title: string
  description: string
  githubLink: string
  liveLink: string
  tags: string[]
  isPublic: boolean;
  image?: string; 
  isAuthenticated: boolean; // Check if the user is authenticated
  onDelete: () => void; // Function to handle delete action
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  githubLink,
  liveLink,
  isPublic,
  isAuthenticated, // For authentication
  onDelete, // Handle delete action
}) => {
  const [isHovered, setIsHovered] = useState(false)

  // Function to generate random background image
  const generateRandomImage = () => {
    const images = [
      "https://picsum.photos/400/300",
    ]
    return images[Math.floor(Math.random() * images.length)]
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="w-full max-w-md overflow-hidden relative">

        <motion.div
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
          className="relative h-48 overflow-hidden"
        >
          <motion.img
            src={generateRandomImage()}
            alt={title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        <CardHeader className="flex flex-row justify-between items-center"> {/* Flexbox for layout */}
          <div className="flex items-center">
            <CardTitle className='text-slate-300'>{title}</CardTitle>
          </div>

          <div className="flex items-center space-x-2"> {/* Flexbox container for delete & bookmark */}
            {isAuthenticated && (
              <button
                className="text-red-500 hover:text-red-700"
                onClick={onDelete}
              >
                <TrashIcon className="w-6 h-6" />
              </button>
            )}
            <button className="text-blue-500 hover:text-blue-700">
              <BookmarkIcon className="w-6 h-6" /> {/* Bookmark icon */}
            </button>
          </div>
        </CardHeader>

        <CardDescription className='ml-6'>{description}</CardDescription>

        <CardContent>
          {/* Tags section can be added here if needed */}
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <a href={githubLink} target="_blank" rel="noopener noreferrer">
              <GitHubLogoIcon className="mr-2 h-4 w-4" />
              View Source
            </a>
          </Button>
          <Button asChild>
            <a href={liveLink} target="_blank" rel="noopener noreferrer">
              <GlobeIcon className="mr-2 h-4 w-4" />
              Live Demo
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export default ProjectCard;
