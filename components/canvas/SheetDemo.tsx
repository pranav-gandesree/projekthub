'use client'

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,  
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import UserLogout from '../UserLogout';
import Link from 'next/link';
import { 
  CodeIcon, 
  HomeIcon, 
  PlusCircleIcon, 
  FolderIcon, 
  BookmarkIcon, 
  UserIcon, 
  LogOutIcon, 
  MenuIcon
} from 'lucide-react';

export function SheetDemo() {
  const { data: session } = useSession(); // Using useSession hook for client-side

  return (
    <Sheet>
      <SheetTrigger asChild>
        {/* <Button variant="outline">Open</Button> */}
        <Button className="text-purple-500">
          <MenuIcon className="w-8 h-8" />
        </Button>
      </SheetTrigger>
      <SheetContent>
       

        <motion.div
          className="fixed top-12 w-64 bg-gray-900 text-white shadow-lg m-4 border rounded-md hidden md:block"
          initial="hidden"
          animate="visible"
          transition={{ type: 'spring', stiffness: 120 }}
        >
          <nav className="mt-2">
            <Link href="/home" className="flex items-center p-4 hover:bg-gray-700 hover:rounded-md text-purple-400">
              <HomeIcon className="h-6 w-6 mr-2" /> Home
            </Link>

            <Link href={`/${session?.user?.name}/projects`} className="flex items-center p-4 hover:bg-gray-700 hover:rounded-md text-purple-400">
              <FolderIcon className="h-6 w-6 mr-2" /> Your Projects
            </Link>

            <Link href={`/${session?.user?.name}`} className="flex items-center p-4 hover:bg-gray-700 hover:rounded-md text-purple-400">
              <UserIcon className="h-6 w-6 mr-2" /> Profile
            </Link>

            <Link href="/new" className="flex items-center p-4 hover:bg-gray-700 hover:rounded-md text-purple-400">
              <PlusCircleIcon className="h-6 w-6 mr-2" /> Create Project
            </Link>

            <Link href={`/${session?.user?.name}/bookmarks`} className="flex items-center p-4 hover:bg-gray-700 hover:rounded-md text-purple-400">
              <BookmarkIcon className="h-6 w-6 mr-2" /> Bookmarks
            </Link>

            <Link href={`/portfolios`} className="flex items-center p-4 hover:bg-gray-700 hover:rounded-md text-purple-400">
              <BookmarkIcon className="h-6 w-6 mr-2" /> Portfolios
            </Link>

            <UserLogout className="flex items-center p-4 hover:bg-gray-700 hover:rounded-md text-purple-400">
              <LogOutIcon className="h-6 w-6 mr-2" /> Logout
            </UserLogout>

          </nav>
        </motion.div>

        {/* <motion.div
          className="fixed bottom-2 w-64 bg-gray-900 text-white shadow-lg m-4 border rounded-md hidden md:block"
          initial="hidden"
          animate="visible"
          transition={{ type: 'spring', stiffness: 120 }}
        >
          <div className="p-2">
            <p>{session?.user.name}</p>
              
           <p> {session?.user.email}</p>
          </div>
        </motion.div> */}
      </SheetContent>
    </Sheet>
  )
}





