'use client';

import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import UserLogout from '../UserLogout';
import Link from 'next/link';
import { CodeIcon } from 'lucide-react';

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

  // return (
  //   <>
  //   <div>
  //     <Link className="flex fixed left-0" href="/">
  //         {/* <CodeIcon className="h-6 w-6 text-purple-400" /> */}
  //         <h2 className="ml-2 text-lg font-bold text-purple-400">
  //           ProjectHub
  //         </h2>
  //       </Link>
  //     </div>
  //   <motion.div
  //     className="fixed left-0 w-48 bg-gray-900 text-white shadow-lg m-4 border rounded-md"
  //     initial="hidden"
  //     animate="visible"
  //     variants={sidebarVariants}
  //     transition={{ type: 'spring', stiffness: 120 }}
  //   >
      
  //     <nav className="mt-2">
  //       {isLoggedIn ? (
  //         <>
  //           <Link href="/home" className="flex items-center p-4 hover:bg-gray-700 hover:rounded-md text-purple-400">
  //             Home
  //           </Link>
  //           <Link href={`/${session.user.name}/projects`} className="flex items-center p-4 hover:bg-gray-700 hover:rounded-md text-purple-400">
  //             Your Projects
  //           </Link>
  //           <Link href={`/${session.user.name}`} className="flex items-center p-4 hover:bg-gray-700 hover:rounded-md text-purple-400">
  //             Profile
  //           </Link>
  //           <Link href="/new" className="flex items-center p-4 hover:bg-gray-700 hover:rounded-md text-purple-400">
  //             Create Project
  //           </Link>
  //           <Link href="#" className="flex items-center p-4 hover:bg-gray-700 hover:rounded-md text-purple-400">
  //             Settings
  //           </Link>
  //           <UserLogout />
  //         </>
  //       ) : (
  //         <>
  //           <Button className='text-purple-400'>
  //             <Link href="/signin">Sign In</Link>
  //           </Button>
  //           <Button className='text-purple-400'>
  //             <Link href="/home">Home</Link>
  //           </Button>
  //         </>
  //       )}
  //     </nav>
  //   </motion.div>
  //   </>
// );
  return (
    <div className="relative">
      {/* ProjectHub Title */}
      <motion.div
        className="fixed top-0 left-0 flex items-center p-2  text-white shadow-lg rounded-md z-10"
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

      {/* Sidebar */}
      <motion.div
        className="fixed top-16 left-0 w-48 bg-gray-900 text-white shadow-lg m-4 border rounded-md"
        initial="hidden"
        animate="visible"
        variants={sidebarVariants}
        transition={{ type: 'spring', stiffness: 120 }}
      >
        <nav className="mt-2">
          {isLoggedIn ? (
            <>
              <Link href="/home" className="flex items-center p-4 hover:bg-gray-700 hover:rounded-md text-purple-400">
                Home
              </Link>
              <Link href={`/${session.user.name}/projects`} className="flex items-center p-4 hover:bg-gray-700 hover:rounded-md text-purple-400">
                Your Projects
              </Link>
              <Link href={`/${session.user.name}`} className="flex items-center p-4 hover:bg-gray-700 hover:rounded-md text-purple-400">
                Profile
              </Link>
              <Link href="/new" className="flex items-center p-4 hover:bg-gray-700 hover:rounded-md text-purple-400">
                Create Project
              </Link>
              <Link href={`/${session.user.name}/bookmarks`} className="flex items-center p-4 hover:bg-gray-700 hover:rounded-md text-purple-400">
                Bookmarks
              </Link>
              <UserLogout />
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
    </div>
  );

}
