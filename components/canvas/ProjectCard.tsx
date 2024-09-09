
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GitHubLogoIcon, GlobeIcon } from '@radix-ui/react-icons'

interface ProjectCardProps {
  title: string
  description: string
  image: string
  githubLink: string
  liveLink: string
  tags: string[]
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
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card className="w-full max-w-md overflow-hidden">
        <motion.div
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
          className="relative h-48 overflow-hidden"
        >
          <motion.img
            src=""
            alt={title}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
         
          </motion.div>
        </motion.div>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          {/* <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Badge variant="secondary">{tag}</Badge>
              </motion.div>
            ))}
          </div> */}
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












// import { useState } from 'react'
// import { motion } from 'framer-motion'
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { GitHubLogoIcon, GlobeIcon, TrashIcon } from '@radix-ui/react-icons'

// interface ProjectCardProps {
//   title: string
//   description: string
//   image: string
//   githubLink: string
//   liveLink: string
//   isPublic: boolean;
//   onDelete: () => void;  // Function to handle delete action
// }

// const ProjectCard: React.FC<ProjectCardProps> = ({
//   title,
//   description,
//   image,
//   githubLink,
//   liveLink,
//   isPublic,
//   onDelete, // Handle delete action
// }) => {
//   const [isHovered, setIsHovered] = useState(false)

//   // Function to generate random background color
//   const generateRandomColor = () => {
//     const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-red-500', 'bg-yellow-500'];
//     return colors[Math.floor(Math.random() * colors.length)];
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       whileHover={{ scale: 1.05 }}
//       onHoverStart={() => setIsHovered(true)}
//       onHoverEnd={() => setIsHovered(false)}
//       className={`relative w-full max-w-md p-6 rounded-lg shadow-lg overflow-hidden ${generateRandomColor()}`}
//       style={{
//         backdropFilter: 'blur(10px)', // Glassmorphism effect
//         background: 'rgba(255, 255, 255, 0.1)', // Transparency
//         border: '1px solid rgba(255, 255, 255, 0.2)',
//       }}
//     >
//       {/* Delete icon in the top-right corner */}
//       <button
//         className="absolute top-3 right-3 text-red-500 hover:text-red-700"
//         onClick={onDelete}
//       >
//         <TrashIcon className="w-6 h-6" />
//       </button>

//       <Card className="w-full max-w-md overflow-hidden">
//         <motion.div
//           animate={{ scale: isHovered ? 1.1 : 1 }}
//           transition={{ duration: 0.3 }}
//           className="relative h-48 overflow-hidden"
//         >
//           <motion.img
//             src={image}
//             alt={title}
//             className="w-full h-full object-cover"
//             animate={{ scale: isHovered ? 1.1 : 1 }}
//             transition={{ duration: 0.3 }}
//           />
//         </motion.div>
//         <CardHeader>
//           <CardTitle>{title}</CardTitle>
//           <CardDescription>{description}</CardDescription>
//         </CardHeader>
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
