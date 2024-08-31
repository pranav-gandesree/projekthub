'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Settings, BarChart, Eye, Clipboard, ClipboardList, Menu } from 'lucide-react';
import Link from 'next/link';
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import UserLogout from "../UserLogout";


export default function Sidebar() {
  const { data: session, status } = useSession();


  const sidebarVariants = {
    hidden: { x: '-100%' },
    visible: { x: 0 },
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session || !session.user) {
    return <p>Not logged in</p>;
  }

  const username = session.user.name || '';
  
  return (
    <>
    
    <motion.div
      className="fixed left-0 w-48 bg-gray-900 text-white shadow-lg m-4 border rounded-md"

      initial="hidden"
      animate=  'visible'
      variants={sidebarVariants}
      transition={{ type: 'spring', stiffness: 120 }}
    >

      <div className=''> 
        <nav className="mt-2">
            {/* <Link href="#" className="flex items-center p-4 hover:bg-gray-700 hover:rounded-md ">
            Home
            </Link> */}
            <Link href="/home" className="flex items-center p-4 hover:bg-gray-700 hover:rounded-md hover:ml-2 hover:mr-2 text-purple-400">
                Home
            </Link>

            <Link href="/projects" className="flex items-center p-4 hover:bg-gray-700 hover:rounded-md hover:ml-2 hover:mr-2 text-purple-400">
            Your Projects
            </Link>

            <Link href={`/${username}`} className="flex items-center p-4 hover:bg-gray-700 hover:rounded-md hover:ml-2 hover:mr-2 text-purple-400">
            Profile
            </Link>
            <Link href="/new" className="flex items-center p-4 hover:bg-gray-700 hover:rounded-md hover:ml-2 hover:mr-2 text-purple-400">
            Create Project
            </Link>

            <Link href="#"className="flex items-center p-4 hover:bg-gray-700 hover:rounded-md hover:ml-2 hover:mr-2 text-purple-400">
            Settings
            </Link>
            {/* <div className=" container flex items-center justify-end"> */}
          {session?.user ? (
            <UserLogout />
          ) : (
            <Button className='text-purple-400'>
              <Link href="/signin">Sign In</Link>
            </Button>
          )}
        {/* </div> */}
        </nav>
      </div>
    </motion.div>


    </>
  );
}



