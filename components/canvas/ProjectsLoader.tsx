import React from 'react'
import { Skeleton } from '../ui/skeleton' 
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui/card'
import { Avatar } from '../ui/avatar'
import { Button } from '../ui/button'

const ProjectsLoader = () => {
  return (
    <div className="container px-4 py-8">
      <Card className="mb-8 backdrop-blur-lg bg-opacity-50 bg-gray-800 border border-gray-500 rounded-lg shadow-lg">
        <CardHeader className="text-center">
          <Avatar className="w-24 h-24 mx-auto mb-4">
            <Skeleton className="h-24 w-24 bg-gray-400 rounded-full" />
          </Avatar>
          <CardTitle className="text-2xl text-white">
            <Skeleton className="h-8 w-1/2 bg-gray-400 rounded" />
          </CardTitle>
          <CardDescription className="text-gray-300">
            <Skeleton className="h-6 w-1/3 bg-gray-400 rounded" />
          </CardDescription>
        </CardHeader>
        <CardFooter className="justify-center">
          <Button disabled className="bg-gray-400 text-gray-700">
            <Skeleton className="h-8 w-24 bg-gray-400 rounded" />
          </Button>
        </CardFooter>
      </Card>

      <h2 className="text-2xl font-bold mb-4 text-white">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, index) => (
          <Card key={index} className="backdrop-blur-lg bg-opacity-50 bg-gray-800 border border-gray-500 rounded-lg shadow-lg">
            <CardHeader>
              <CardTitle className="text-white">
                <Skeleton className="h-6 w-3/4 bg-gray-400 rounded" />
              </CardTitle>
              <CardDescription className="text-gray-300">
                <Skeleton className="h-4 w-full bg-gray-400 rounded" />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-5/6 bg-gray-400 rounded" />
              <Skeleton className="h-4 w-full bg-gray-400 rounded" />
            </CardContent>
            <CardFooter className="flex justify-start gap-2">
              <Button disabled className="bg-gray-400 text-gray-700">
                <Skeleton className="h-6 w-20 bg-gray-400 rounded" />
              </Button>
              <Button disabled className="bg-gray-400 text-gray-700">
                <Skeleton className="h-6 w-20 bg-gray-400 rounded" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default ProjectsLoader
