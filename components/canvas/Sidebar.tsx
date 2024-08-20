'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Settings, BarChart, Eye, Clipboard, ClipboardList, Menu } from 'lucide-react';
import Link from 'next/link';
import { useSession } from "next-auth/react";

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
      className="fixed left-0 h-[60%] w-40 bg-gray-900 text-white shadow-lg m-2 border rounded-md"

      initial="hidden"
      animate=  'visible'
      variants={sidebarVariants}
      transition={{ type: 'spring', stiffness: 120 }}
    >

      <div className=''> 
        <nav className="mt-6">
            {/* <Link href="#" className="flex items-center p-4 hover:bg-gray-700 hover:rounded-md ">
            Home
            </Link> */}
            <Link href="/home" className="flex items-center p-4 hover:bg-gray-700 hover:rounded-md hover:ml-2 hover:mr-2">
                Home
            </Link>

            <Link href="#" className="flex items-center p-4 hover:bg-gray-700 hover:rounded-md hover:ml-2 hover:mr-2">
            Your Projects
            </Link>

            <Link href={`/${username}`} className="flex items-center p-4 hover:bg-gray-700 hover:rounded-md hover:ml-2 hover:mr-2">
            Profile
            </Link>
            <Link href="/new" className="flex items-center p-4 hover:bg-gray-700 hover:rounded-md hover:ml-2 hover:mr-2">
            Create Project
            </Link>

            <Link href="#"className="flex items-center p-4 hover:bg-gray-700 hover:rounded-md hover:ml-2 hover:mr-2">
            Settings
            </Link>
        </nav>
      </div>
    </motion.div>


    </>
  );
}



