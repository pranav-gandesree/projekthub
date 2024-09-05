'use client';

import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import UserLogout from '../UserLogout';
import Link from 'next/link';
import { 
  CodeIcon, 
  HomeIcon, 
  PlusCircleIcon, 
  FolderIcon, 
  BookmarkIcon, 
  UserIcon, 
  LogOutIcon 
} from 'lucide-react';

export default function Sidebar() {
  const { data: session, status } = useSession();

  const sidebarVariants = {
    hidden: { x: '-100%' },
    visible: { x: 0 },
  };

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  const isLoggedIn = session?.user !== undefined;

  return (
    <div className="relative">
      {/* ProjectHub Title */}

      <motion.div
        className="fixed top-0 left-0 flex items-center p-2 text-white shadow-lg rounded-md z-10 md:hidden"
        initial="hidden"
        animate="visible"
        variants={sidebarVariants}
        transition={{ type: 'spring', stiffness: 120 }}
      >
        <Link href="/" className='flex flex-row p-3'>
          <CodeIcon className="h-9 w-9 text-purple-400" />
          <h2 className="ml-2 text-3xl font-bold text-purple-400">
            ProjectHub
          </h2>
        </Link>
      </motion.div>

      {/* Sidebar for desktop */}
      <motion.div
        className="fixed top-16 left-0 w-48 bg-gray-900 text-white shadow-lg m-4 border rounded-md hidden md:block"
        initial="hidden"
        animate="visible"
        variants={sidebarVariants}
        transition={{ type: 'spring', stiffness: 120 }}
      >
        <nav className="mt-2">
          {isLoggedIn ? (
            <>
              <Link href="/home" className="flex items-center p-4 hover:bg-gray-700 hover:rounded-md text-purple-400">
                <HomeIcon className="h-6 w-6 mr-2" /> Home
              </Link>
              <Link href={`/${session.user.name}/projects`} className="flex items-center p-4 hover:bg-gray-700 hover:rounded-md text-purple-400">
                <FolderIcon className="h-6 w-6 mr-2" /> Your Projects
              </Link>
              <Link href={`/${session.user.name}`} className="flex items-center p-4 hover:bg-gray-700 hover:rounded-md text-purple-400">
                <UserIcon className="h-6 w-6 mr-2" /> Profile
              </Link>
              <Link href="/new" className="flex items-center p-4 hover:bg-gray-700 hover:rounded-md text-purple-400">
                <PlusCircleIcon className="h-6 w-6 mr-2" /> Create Project
              </Link>
              <Link href={`/${session.user.name}/bookmarks`} className="flex items-center p-4 hover:bg-gray-700 hover:rounded-md text-purple-400">
                <BookmarkIcon className="h-6 w-6 mr-2" /> Bookmarks
              </Link>
              <UserLogout className="flex items-center p-4 hover:bg-gray-700 hover:rounded-md text-purple-400">
                <LogOutIcon className="h-6 w-6 mr-2" /> Logout
              </UserLogout>
            </>
          ) : (
            <>
              <Button className='text-purple-400'>
                <Link href="/signin">Sign In</Link>
              </Button>
              <Button className='text-purple-400'>
                <Link href="/home">Home</Link>
              </Button>
            </>
          )}
        </nav>
      </motion.div>

      {/* Bottom Navbar for mobile */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 flex justify-around bg-gray-900 text-white p-4 md:hidden"
        initial="hidden"
        animate="visible"
        variants={sidebarVariants}
        transition={{ type: 'spring', stiffness: 120 }}
      >
        <Link href="/home" className="flex flex-col items-center text-purple-400">
          <HomeIcon className="h-6 w-6" />
          <span>Home</span>
        </Link>
        <Link href="/new" className="flex flex-col items-center text-purple-400">
          <PlusCircleIcon className="h-6 w-6" />
          <span>Add</span>
        </Link>
        <Link href="/memories" className="flex flex-col items-center text-purple-400">
          <BookmarkIcon className="h-6 w-6" />
          <span>Memories</span>
        </Link>
      </motion.div>
    </div>
  );
}
