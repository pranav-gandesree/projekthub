'use client'

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { GithubIcon, ExternalLinkIcon, BookmarkIcon } from 'lucide-react';
import Bookmark from './Bookmark';

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
        setBookmarks(data.bookmarks);
        setUserBookmarks(new Set(data.bookmarks.map((b: any) => b.id)));
        localStorage.setItem("bookmarks", JSON.stringify(data.bookmarks));
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
      <h2 className="text-3xl font-bold mb-8 text-center">{user}'s Bookmarks</h2>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {bookmarks.length > 0 ? (
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
                       {bookmark.createdBy.name} <span className='text-white'>created this project</span> 
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
                  {bookmark.image && (
                    <div className="relative h-48 mb-4 overflow-hidden rounded-md">
                      <img
                        src={bookmark.image}
                        alt={`${bookmark.title} thumbnail`}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                  )}
                  <h3 className="text-2xl font-semibold text-slate-100 mb-2">{bookmark.title}</h3>
                  <p className="text-gray-600 mb-4">{bookmark.description}</p>
                </CardContent>
                <CardFooter className="flex justify-start gap-4">
                  <Button variant="outline" asChild>
                    <a href={bookmark.githubLink} target="_blank" rel="noopener noreferrer">
                      <GithubIcon className="mr-2 h-4 w-4" />
                      GitHub
                    </a>
                  </Button>
                  {bookmark.liveLink && (
                    <Button variant="outline" asChild>
                      <a href={bookmark.liveLink} target="_blank" rel="noopener noreferrer">
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
          <p className="col-span-full text-center text-gray-500 text-lg">No bookmarks found.</p>
        )}
      </motion.div>
    </div>
  );
};

export default UserBookmarks;
