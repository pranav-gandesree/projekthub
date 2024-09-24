// 'use client'

// import { useEffect, useState } from 'react'
// import { useSession } from 'next-auth/react'
// import { motion } from 'framer-motion'
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Skeleton } from '@/components/ui/skeleton'
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { GitHubLogoIcon, GlobeIcon, LockClosedIcon } from '@radix-ui/react-icons'
// import axios from 'axios'
// import Link from 'next/link'
// import ProjectsLoader from '@/components/canvas/ProjectsLoader'
// import { FileInput } from 'lucide-react'
// import { Textarea } from '../ui/textarea'
// import { Input } from '../ui/input'


// interface Project {
//   id: number
//   title: string
//   description: string
//   githubLink: string
//   liveLink: string
//   isPublic: boolean
//   tags: string[]
// }

// interface User {
//   name: string
//   email?: string
//   projects?: Project[]
// }

// export default function UserProfile({ username }: { username: string }) {
//   const [user, setUser] = useState<User | null>(null)
//   const [error, setError] = useState<string | null>(null)
//   const { data: session, status } = useSession()
//   const [isEditing, setIsEditing] = useState(false);

//   const handleEditClick = () => {
//     setIsEditing(!isEditing);
//   };

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await fetch(`/api/users/${username}`)
//         if (!response.ok) {
//           throw new Error('Failed to fetch user data')
//         }
//         const userData = await response.json()

//         if (!userData.name || !userData.email) {
//           throw new Error("Name or email is missing in the API response")
//         }

//         const mappedProjects = userData.projects.map((project: any) => ({
//           ...project,
//           isPublic: project.public,
//         }))

//         setUser({ ...userData, projects: mappedProjects })
//       } catch (error) {
//         setError('Error fetching user')
//         console.error('Error fetching user:', error)
//       }
//     }

//     fetchUser()
//   }, [username])

//   if (error) {
//     return <div className="text-center text-red-500">{error}</div>
//   }

//   if (!user) {
//     return (
//       // <div>loading....</div>
//       <ProjectsLoader/>
//     )
//   }

//   return (
//     <div className="container px-4 py-8">
//   <motion.div
//     initial={{ opacity: 0, y: 20 }}
//     animate={{ opacity: 1, y: 0 }}
//     transition={{ duration: 0.5 }}
//   >
//     <Card className="mb-8 backdrop-blur-lg bg-opacity-50 bg-gray-800 border border-gray-500 rounded-lg shadow-lg">
//       <CardHeader className="text-center">
//         <Avatar className="w-24 h-24 mx-auto mb-4">
//           <AvatarImage
//             src={`https://avatars.githubusercontent.com/${username}`}
//             alt={user.name}
//           />
//           <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
//         </Avatar>
//         <CardTitle className="text-2xl text-white">{user.name}</CardTitle>
//         <CardDescription className="text-gray-300">{user.email}</CardDescription>
//       </CardHeader>
//       <CardFooter className="justify-center">
//         {/* <Button>Edit Profile</Button> */}
//         <Button onClick={handleEditClick}>
//               {isEditing ? 'Close' : 'Edit Profile'}
//             </Button>
//       </CardFooter>
//     </Card>

//   </motion.div>





//   <h2 className="text-2xl font-bold mb-4 text-white">Projects</h2>
//   {user.projects && user.projects.length > 0 ? (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {user.projects.map((project, index) => (
//         <motion.div
//           key={project.id}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: index * 0.1 }}
//         >
//           <Card className="backdrop-blur-lg bg-opacity-50 bg-gray-800 border border-gray-500 rounded-lg shadow-lg">
//             <CardHeader>
//               <CardTitle className="flex items-center justify-between text-white">
//                 {project.title}
//                 {project.isPublic ? (
//                   <Badge variant="secondary">Public</Badge>
//                 ) : (
//                   <Badge variant="outline">
//                     <LockClosedIcon className="w-3 h-3 mr-1" /> Private
//                   </Badge>
//                 )}
//               </CardTitle>
//               <CardDescription className="text-gray-300">{project.description}</CardDescription>
//             </CardHeader>
//             {/* <CardContent>
//               tags
//             </CardContent> */}
//             <CardFooter className="flex justify-start gap-2">
//               <Button variant="default" asChild className='hover:bg-purple-500 border border-gray-400 '>
//                 <a
//                   href={project.githubLink}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <GitHubLogoIcon className="w-4 h-4 mr-2" />
//                   GitHub
//                 </a>
//               </Button>
//               <Button asChild className='hover:bg-purple-500 border border-gray-400 '>
//                 <a
//                   href={project.liveLink}
//                   target="_blank"
//                   rel="noopener noreferrer"
                  
//                 >
//                   <GlobeIcon className="w-4 h-4 mr-2" />
//                   Live Demo
//                 </a>
//               </Button>
//             </CardFooter>

//           </Card>
        
//         </motion.div>
//       ))}
//           <div>
//           <Link href={`/${session?.user.name}/projects`}>
//           <Button> Show more projects</Button>
//           </Link>
//         </div>
//     </div>
//   ) : (
//     <p className="text-center text-gray-500">No projects found.</p>
//   )}
// </div>

//   )
// }












// 'use client'

// import { useEffect, useState } from 'react'
// import { useSession } from 'next-auth/react'
// import { motion } from 'framer-motion'
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { GitHubLogoIcon, GlobeIcon, LockClosedIcon, TwitterLogoIcon } from '@radix-ui/react-icons'
// import Link from 'next/link'
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Label } from "@/components/ui/label"

// interface Project {
//   id: number
//   title: string
//   description: string
//   githubLink: string
//   liveLink: string
//   isPublic: boolean
//   tags: string[]
// }

// interface User {
//   name: string
//   email?: string
//   bio?: string
//   twitter?: string
//   github?: string
//   portfolio?: string
//   projects?: Project[]
// }

// export default function UserProfile({ username }: { username: string }) {
//   const [user, setUser] = useState<User | null>(null)
//   const [error, setError] = useState<string | null>(null)
//   const { data: session, status } = useSession()
//   const [isEditing, setIsEditing] = useState(false)
//   const [editedUser, setEditedUser] = useState<User | null>(null)

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await fetch(`/api/users/${username}`)
//         if (!response.ok) {
//           throw new Error('Failed to fetch user data')
//         }
//         const userData = await response.json()
//         setUser(userData)
//         setEditedUser(userData)
//       } catch (error) {
//         setError('Error fetching user')
//         console.error('Error fetching user:', error)
//       }
//     }

//     fetchUser()
//   }, [username])

//   const handleEditClick = () => {
//     setIsEditing(!isEditing)
//   }

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target
//     setEditedUser(prev => ({ ...prev!, [name]: value }))
//   }

//   const handleSave = async () => {
//     // Here you would typically send a request to update the user data
//     // For now, we'll just update the local state
//     setUser(editedUser)
//     setIsEditing(false)
//   }

//   if (error) {
//     return <div className="text-center text-red-500">{error}</div>
//   }

//   if (!user) {
//     return <div>Loading...</div>
//   }

//   return (
//     <div className="container px-4 py-8">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <Card className="mb-8 backdrop-blur-lg bg-opacity-50 bg-gray-800 border border-gray-500 rounded-lg shadow-lg overflow-hidden">
//           <CardHeader className="text-center relative pb-24">
//             <div className="absolute inset-0 h-32 bg-gradient-to-r from-purple-500 to-pink-500"></div>
//             <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-white relative z-10 mt-16">
//               <AvatarImage
//                 src={`https://avatars.githubusercontent.com/${username}`}
//                 alt={user.name}
//               />
//               <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
//             </Avatar>
//           </CardHeader>
//           <CardContent className="px-6 py-4">
//             {isEditing ? (
//               <div className="space-y-4">
//                 <div>
//                   <Label htmlFor="name">Name</Label>
//                   <Input
//                     id="name"
//                     name="name"
//                     value={editedUser?.name}
//                     onChange={handleInputChange}
//                     className="mt-1"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="bio">Bio</Label>
//                   <Textarea
//                     id="bio"
//                     name="bio"
//                     value={editedUser?.bio || ''}
//                     onChange={handleInputChange}
//                     className="mt-1"
//                     rows={3}
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="twitter">Twitter</Label>
//                   <Input
//                     id="twitter"
//                     name="twitter"
//                     value={editedUser?.twitter || ''}
//                     onChange={handleInputChange}
//                     className="mt-1"
//                     placeholder="Twitter username"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="github">GitHub</Label>
//                   <Input
//                     id="github"
//                     name="github"
//                     value={editedUser?.github || ''}
//                     onChange={handleInputChange}
//                     className="mt-1"
//                     placeholder="GitHub username"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="portfolio">Portfolio</Label>
//                   <Input
//                     id="portfolio"
//                     name="portfolio"
//                     value={editedUser?.portfolio || ''}
//                     onChange={handleInputChange}
//                     className="mt-1"
//                     placeholder="Portfolio URL"
//                   />
//                 </div>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 <h2 className="text-2xl font-bold text-white">{user.name}</h2>
//                 <p className="text-gray-300">{user.bio || 'No bio available'}</p>
//                 <div className="flex space-x-4">
//                   {user.twitter && (
//                     <a href={`https://twitter.com/${user.twitter}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
//                       <TwitterLogoIcon className="w-6 h-6" />
//                     </a>
//                   )}
//                   {user.github && (
//                     <a href={`https://github.com/${user.github}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300">
//                       <GitHubLogoIcon className="w-6 h-6" />
//                     </a>
//                   )}
//                   {user.portfolio && (
//                     <a href={user.portfolio} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300">
//                       <GlobeIcon className="w-6 h-6" />
//                     </a>
//                   )}
//                 </div>
//               </div>
//             )}
//           </CardContent>
//           <CardFooter className="justify-center">
//             {isEditing ? (
//               <Button onClick={handleSave} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
//                 Save Changes
//               </Button>
//             ) : (
//               <Button onClick={handleEditClick} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
//                 Edit Profile
//               </Button>
//             )}
//           </CardFooter>
//         </Card>
//       </motion.div>

//       {/* Projects section remains unchanged */}
//       {/* ... */}
//     </div>
//   )
// }











'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GitHubLogoIcon, GlobeIcon, LockClosedIcon, TwitterLogoIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface Project {
  id: number
  title: string
  description: string
  githubLink: string
  liveLink: string
  isPublic: boolean
  tags: string[]
}

interface User {
  name: string
  email?: string
  bio?: string
  twitter?: string
  github?: string
  portfolio?: string
  projects?: Project[]
}

export default function UserProfile({ username }: { username: string }) {
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { data: session, status } = useSession()
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${username}`)
        if (!response.ok) {
          throw new Error('Failed to fetch user data')
        }
        const userData = await response.json()
        setUser(userData)
        setEditedUser(userData)
      } catch (error) {
        setError('Error fetching user')
        console.error('Error fetching user:', error)
      }
    }

    fetchUser()
  }, [username])

  const handleEditClick = () => {
    setIsEditing(!isEditing)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditedUser(prev => ({ ...prev!, [name]: value }))
  }

  const handleSave = async () => {
    // Here you would typically send a request to update the user data
    // For now, we'll just update the local state
    setUser(editedUser)
    setIsEditing(false)
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="container px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Profile Card */}
        <div className="w-full lg:w-1/4 order-1 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="backdrop-blur-lg bg-opacity-50 bg-gray-800 border border-gray-500 rounded-lg shadow-lg overflow-hidden">
              <CardHeader className="text-center relative">
                <div className="absolute inset-0 h-32 bg-gradient-to-r from-purple-500 to-pink-500"></div>
                <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-white relative z-10 mt-16">
                  <AvatarImage
                    src={`https://avatars.githubusercontent.com/${username}`}
                    alt={user.name}
                  />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </CardHeader>
              <CardContent className="px-6 py-4">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={editedUser?.name}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        value={editedUser?.bio || ''}
                        onChange={handleInputChange}
                        className="mt-1"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="twitter">Twitter</Label>
                      <Input
                        id="twitter"
                        name="twitter"
                        value={editedUser?.twitter || ''}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="Twitter username"
                      />
                    </div>
                    <div>
                      <Label htmlFor="github">GitHub</Label>
                      <Input
                        id="github"
                        name="github"
                        value={editedUser?.github || ''}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="GitHub username"
                      />
                    </div>
                    <div>
                      <Label htmlFor="portfolio">Portfolio</Label>
                      <Input
                        id="portfolio"
                        name="portfolio"
                        value={editedUser?.portfolio || ''}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="Portfolio URL"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                    <p className="text-gray-300">{user.bio || 'No bio available'}</p>
                    <div className="flex space-x-4">
                      {user.twitter && (
                        <a href={`https://twitter.com/${user.twitter}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                          <TwitterLogoIcon className="w-6 h-6" />
                        </a>
                      )}
                      {user.github && (
                        <a href={`https://github.com/${user.github}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300">
                          <GitHubLogoIcon className="w-6 h-6" />
                        </a>
                      )}
                      {user.portfolio && (
                        <a href={user.portfolio} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300">
                          <GlobeIcon className="w-6 h-6" />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="justify-center">
                {isEditing ? (
                  <Button onClick={handleSave} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    Save Changes
                  </Button>
                ) : (
                  <Button onClick={handleEditClick} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                    Edit Profile
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        </div>

        {/* Projects */}
        <div className="w-full lg:w-3/4 order-2 lg:order-2">
          <h2 className="text-2xl font-bold mb-4 text-white">Projects</h2>
          {user.projects && user.projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {user.projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="backdrop-blur-lg bg-opacity-50 bg-gray-800 border border-gray-500 rounded-lg shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between text-white">
                        {project.title}
                        {project.isPublic ? (
                          <Badge variant="secondary">Public</Badge>
                        ) : (
                          <Badge variant="outline">
                            <LockClosedIcon className="w-3 h-3 mr-1" /> Private
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription className="text-gray-300">{project.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="flex flex-col sm:flex-row justify-start gap-2">
                      <Button variant="default" asChild className='w-full sm:w-auto hover:bg-purple-500 border border-gray-400'>
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <GitHubLogoIcon className="w-4 h-4 mr-2" />
                          GitHub
                        </a>
                      </Button>
                      <Button asChild className='w-full sm:w-auto hover:bg-purple-500 border border-gray-400'>
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <GlobeIcon className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No projects found.</p>
          )}
          <div className="mt-6">
            {/* <Link href={`/${session?.user.name}/projects`}> */}
            <Link href={`/${session?.user?.name}/projects`}>
              <Button className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                Show more projects
              </Button>
          
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}