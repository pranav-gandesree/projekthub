'use client'

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { GithubIcon, ExternalLinkIcon, TagIcon } from 'lucide-react';
import Bookmark from './Bookmark';
import Image from 'next/image';
import NoBookmark from '../bookmark/NoBookmark';
import Link from 'next/link';
import { Badge } from '../ui/badge';

const UserBookmarks = ({ username }: { username: string }) => {
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userBookmarks, setUserBookmarks] = useState<Set<number>>(new Set());


  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await fetch(`/api/users/${username}/bookmarks`);
        if (!response.ok) {
          throw new Error('Failed to fetch bookmarks');
        }
        const data = await response.json();
        setUser(data.username);
        console.log(data)
        setBookmarks(data.bookmarks);
        setUserBookmarks(new Set(data.bookmarks.map((b: any) => b.id)));
        // localStorage.setItem("bookmarks", JSON.stringify(data.bookmarks));
      } catch (error) {
        setError('Failed to fetch bookmarks');
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [username]);


  const handleBookmarkToggle = (projectId: number) => {
    setUserBookmarks(prev => {
      const updatedBookmarks = new Set(prev);
      if (updatedBookmarks.has(projectId)) {
        updatedBookmarks.delete(projectId);
      } else {
        updatedBookmarks.add(projectId);
      }
      return updatedBookmarks;
    });
  };


  if (loading) {
    return <div>Loading bookmarks...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center">{user} Bookmarks</h2>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* {bookmarks.length > 0 ? (
          bookmarks.map((bookmark) => (
            <motion.div
              key={bookmark.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card className="overflow-hidden h-full flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <p className="text-md text-gray-500 mt-1">
                      <span className="font-medium text-purple-500">
                       {username} <span className='text-white'>created this project</span> 
                      </span>
                    </p>
                     <Bookmark
                      projectId={bookmark.id}
                      userId={username}
                      isBookmarked={userBookmarks.has(bookmark.id)}
                      onToggle={handleBookmarkToggle}
                    />
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  {bookmark.projectImage ? (
                                        <div className="relative h-48 overflow-hidden">
                                          <Image
                                            src={bookmark.projectImage}
                                            alt={`${bookmark.title} thumbnail`}
                                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                                            width={250}
                                            height={200}
                                          />
                                          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                                        </div>
                                      ) : (
                                        <div className="h-48 bg-gradient-to-br from-purple-600 to-blue-600"></div>
                                      )}
                  <h3 className="text-2xl font-semibold text-slate-100 mb-2">{bookmark.projectName}</h3>
                  <p className="text-gray-600 mb-4">{bookmark.projectDescription}</p>
                </CardContent>
                <CardFooter className="flex justify-start gap-4">
                  <Button variant="outline" asChild>
                    <a href={bookmark.projectGithubLink} target="_blank" rel="noopener noreferrer">
                      <GithubIcon className="mr-2 h-4 w-4" />
                      GitHub
                    </a>
                  </Button>
                  {bookmark.projectLiveLink && (
                    <Button variant="outline" asChild>
                      <a href={bookmark.projectLiveLink} target="_blank" rel="noopener noreferrer">
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
          <NoBookmark/>
        )} */}





{bookmarks.length > 0 ? (
            bookmarks.map((bookmark) => (
              <motion.div
                key={bookmark.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="overflow-hidden h-full flex flex-col bg-gray-800/50 border-gray-700 hover:border-purple-500 transition-all duration-300">
                  <CardHeader className="relative p-0">
                    {bookmark.projectImage ? (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={bookmark.projectImage}
                          alt={`${bookmark.title} thumbnail`}
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
                      <Link href={`/${username}`} className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                        @{username}
                      </Link>

                      <Bookmark
                                      projectId={bookmark.id}
                                      userId={username}
                                      isBookmarked={userBookmarks.has(bookmark.id)}
                                      onToggle={handleBookmarkToggle}
                      />
            
                    </div>
                    <CardTitle className="text-2xl font-bold mb-3 text-white">{bookmark.title}</CardTitle>
                    <p className="text-gray-300 mb-4 line-clamp-3">{bookmark.projectDescription}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {bookmark.projectTags.map((tag: any, index: any) => (
                        <Badge key={index} variant="outline" className="bg-gray-700/50 text-gray-300 border-gray-600">
                          <TagIcon className="w-3 h-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between gap-4 p-6 bg-gray-800/30">
                    <Button variant="default" asChild className="flex-1 bg-purple-600 hover:bg-purple-700">
                      <a href={bookmark.projectGithubLink} target="_blank" rel="noopener noreferrer">
                        <GithubIcon className="mr-2 h-4 w-4" />
                        GitHub
                      </a>
                    </Button>
                    {bookmark.projectLiveLink && (
                      <Button variant="outline" asChild className="flex-1 border-purple-500 text-slate-900">
                        <a href={bookmark.projectLiveLink} target="_blank" rel="noopener noreferrer">
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
            <NoBookmark/>
          )}





      </motion.div>
    </div>
  );
};

export default UserBookmarks;
