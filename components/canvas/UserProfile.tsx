'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GitHubLogoIcon, GlobeIcon, LockClosedIcon } from '@radix-ui/react-icons'
import axios from 'axios'
import Link from 'next/link'

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
  projects?: Project[]
}

export default function UserProfile({ username }: { username: string }) {
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { data: session, status } = useSession()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${username}`)
        if (!response.ok) {
          throw new Error('Failed to fetch user data')
        }
        const userData = await response.json()

        if (!userData.name || !userData.email) {
          throw new Error("Name or email is missing in the API response")
        }

        const mappedProjects = userData.projects.map((project: any) => ({
          ...project,
          isPublic: project.public,
        }))

        setUser({ ...userData, projects: mappedProjects })
      } catch (error) {
        setError('Error fetching user')
        console.error('Error fetching user:', error)
      }
    }

    fetchUser()
  }, [username])

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  if (!user) {
    return <div className="text-center">Loading...</div>
  }

  return (
    <div className="container px-4 py-8">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Card className="mb-8 backdrop-blur-lg bg-opacity-50 bg-gray-800 border border-gray-500 rounded-lg shadow-lg">
      <CardHeader className="text-center">
        <Avatar className="w-24 h-24 mx-auto mb-4">
          <AvatarImage
            src={`https://avatars.githubusercontent.com/${username}`}
            alt={user.name}
          />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <CardTitle className="text-2xl text-white">{user.name}</CardTitle>
        <CardDescription className="text-gray-300">{user.email}</CardDescription>
      </CardHeader>
      <CardFooter className="justify-center">
        <Button>Edit Profile</Button>
      </CardFooter>
    </Card>
  </motion.div>

  <h2 className="text-2xl font-bold mb-4 text-white">Projects</h2>
  {user.projects && user.projects.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <CardContent>
              {/* Add the tags mapping here if needed */}
            </CardContent>
            <CardFooter className="flex justify-start gap-4">
              <Button variant="outline" asChild>
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHubLogoIcon className="w-4 h-4 mr-2" />
                  GitHub
                </a>
              </Button>
              <Button asChild>
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
          <div>
          <Link href={`/${session?.user.name}/projects`}>
          <Button> Show more projects</Button>
          </Link>
        </div>
    </div>
  ) : (
    <p className="text-center text-gray-500">No projects found.</p>
  )}
</div>

  )
}