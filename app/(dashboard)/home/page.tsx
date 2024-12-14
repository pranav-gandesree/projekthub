'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {  ExternalLinkIcon, GithubIcon, TagIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

interface User {
  id: number
  name: string
}

interface Tag {
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
  public: boolean;
  createdBy: User;
  createdAt: string;
  tags: string[];
}

export default function ProjectGallery() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  // const [bookmarks, setBookmarks] = useState<Set<number>>(new Set())
  const { data: session } = useSession();

  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 15;

    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

    const totalPages = Math.ceil(projects.length / projectsPerPage);

    
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects')
        if (!response.ok) {
          throw new Error('Failed to fetch projects')
        }
        const data = await response.json()
        setProjects(data)
      } catch (error) {
        setError('Failed to fetch public projects')
      } finally {
        setLoading(false)
      }
    }

  //   const fetchBookmarks = async () => {
  //     if (session?.user.id) {
  //       try {
  //         const response = await fetch(`/api/users/${session.user.id}/bookmarks`)
  //         if (!response.ok) {
  //           throw new Error('Failed to fetch bookmarks')
  //         }
  //         const data = await response.json()
  //         setBookmarks(new Set(data.bookmarks))
  //         localStorage.setItem('bookmarks', JSON.stringify(data.bookmarks))
  //       } catch (error) {
  //         console.error('Failed to fetch bookmarks', error)
  //       }
  //     } else {
  //       console.warn('Session or user ID is not available');
  //     }
      
  //   }
  //   fetchBookmarks()

    fetchProjects()
  }, [session])


  

  // const handleBookmark = async (projectId: number, action: 'add' | 'remove') => {
  //   try {
  //     const userId = session?.user.id;
  //     const response = await fetch(`/api/users/${userId}/bookmarks/${action}`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         userId,
  //         projectId,
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to update bookmark');
  //     }

  //     setBookmarks(prev => {
  //       const newBookmarks = new Set(prev);
  //       if (action === 'add') {
  //         newBookmarks.add(projectId);
  //       } else {
  //         newBookmarks.delete(projectId);
  //       }
  //       localStorage.setItem('bookmarks', JSON.stringify(Array.from(newBookmarks)));
  //       return newBookmarks;
  //     });
  //   } catch (error) {
  //     console.error('Error handling bookmark:', error);
  //   }
  // }


  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, index) => (
          <Card key={index} className="overflow-hidden bg-gray-800/50 border-gray-700">
            <Skeleton className="h-48 w-full bg-gray-700" />
            <CardHeader>
              <Skeleton className="h-6 w-3/4 bg-gray-700" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-full mb-2 bg-gray-700" />
              <Skeleton className="h-4 w-5/6 bg-gray-700" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-full bg-gray-700" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold mb-12 text-left text-white">Discover Projects</h2>
      <AnimatePresence>


        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >


           {currentProjects.length > 0 ? (
            currentProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="overflow-hidden h-full flex flex-col bg-gray-800/50 border-gray-700 hover:border-purple-500 transition-all duration-300">
                  <CardHeader className="relative p-0">
                    {project.image ? (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={project.image}
                          alt={`${project.title} thumbnail`}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                          width={200}
                          height={200}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                      </div>
                    ) : (
                      <div className="h-48 bg-gradient-to-br from-purple-600 to-blue-600"></div>
                    )}
     
                  </CardHeader>
                  <CardContent className="flex-grow p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Link href={`/${project.createdBy.name}`} className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                        @{project.createdBy.name}
                      </Link>
            
                    </div>
                    <CardTitle className="text-2xl font-bold mb-3 text-white">{project.title}</CardTitle>
                    <p className="text-gray-300 mb-4 line-clamp-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="bg-gray-700/50 text-gray-300 border-gray-600">
                          <TagIcon className="w-3 h-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between gap-4 p-6 bg-gray-800/30">
                    <Button variant="default" asChild className="flex-1 bg-purple-600 hover:bg-purple-700">
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                        <GithubIcon className="mr-2 h-4 w-4" />
                        GitHub
                      </a>
                    </Button>
                    {project.liveLink && (
                      <Button variant="outline" asChild className="flex-1 border-purple-500 text-slate-900">
                        <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                          <ExternalLinkIcon className="mr-2 h-4 w-4" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-400 text-lg">No public projects found.</p>
          )}
        </motion.div>
      </AnimatePresence>
      


{totalPages > 1 && (
  <div className="flex justify-center mt-8">
    <Button
      onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
      className="mx-1 bg-purple-600 hover:bg-purple-700"
    >
      Previous
    </Button>
    <p className="text-white mx-3">Page {currentPage} of {totalPages}</p>
    <Button
      onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
      disabled={currentPage === totalPages}
      className="mx-1 bg-purple-600 hover:bg-purple-700"
    >
      Next
    </Button>
  </div>
)}

    </div>
  )
}