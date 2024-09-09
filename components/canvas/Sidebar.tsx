// 'use client';

// import { motion } from 'framer-motion';
// import { useSession } from 'next-auth/react';
// import { Button } from '@/components/ui/button';
// import UserLogout from '../UserLogout';
// import Link from 'next/link';
// import { 
//   CodeIcon, 
//   HomeIcon, 
//   PlusCircleIcon, 
//   FolderIcon, 
//   BookmarkIcon, 
//   UserIcon, 
//   LogOutIcon 
// } from 'lucide-react';

// export default function Sidebar() {
//   const { data: session, status } = useSession();

//   const sidebarVariants = {
//     hidden: { x: '-100%' },
//     visible: { x: 0 },
//   };

//   if (status === 'loading') {
//     return <p>Loading...</p>;
//   }

//   // Check if session is not null
//   const isLoggedIn = session?.user !== undefined;

//   return (
//     <div className="relative">
//       {/* ProjectHub Title */}
//       <motion.div
//         className="fixed top-0 left-0 flex items-center p-2 text-white shadow-lg rounded-md z-10 md:hidden"
//         initial="hidden"
//         animate="visible"
//         variants={sidebarVariants}
//         transition={{ type: 'spring', stiffness: 120 }}
//       >
//         <Link href="/" className='flex flex-row p-3'>
//           <CodeIcon className="h-9 w-9 text-purple-400" />
//           <h2 className="ml-2 text-3xl font-bold text-purple-400">
//             ProjectHub
//           </h2>
//         </Link>
//       </motion.div>

//       {/* Sidebar for desktop */}
//       <motion.div
//         className="fixed top-16 left-0 w-48 bg-gray-900 text-white shadow-lg m-4 border rounded-md hidden md:block"
//         initial="hidden"
//         animate="visible"
//         variants={sidebarVariants}
//         transition={{ type: 'spring', stiffness: 120 }}
//       >
//         <nav className="mt-2">
//           {isLoggedIn ? (
//             <>
//               <Link href="/home" className="flex items-center p-4 hover:bg-gray-700 hover:rounded-md text-purple-400">
//                 <HomeIcon className="h-6 w-6 mr-2" /> Home
//               </Link>
//               <Link href={`/${session?.user?.name}/projects`} className="flex items-center p-4 hover:bg-gray-700 hover:rounded-md text-purple-400">
//                 <FolderIcon className="h-6 w-6 mr-2" /> Your Projects
//               </Link>
//               <Link href={`/${session?.user?.name}`} className="flex items-center p-4 hover:bg-gray-700 hover:rounded-md text-purple-400">
//                 <UserIcon className="h-6 w-6 mr-2" /> Profile
//               </Link>
//               <Link href="/new" className="flex items-center p-4 hover:bg-gray-700 hover:rounded-md text-purple-400">
//                 <PlusCircleIcon className="h-6 w-6 mr-2" /> Create Project
//               </Link>
//               <Link href={`/${session?.user?.name}/bookmarks`} className="flex items-center p-4 hover:bg-gray-700 hover:rounded-md text-purple-400">
//                 <BookmarkIcon className="h-6 w-6 mr-2" /> Bookmarks
//               </Link>
//               <UserLogout className="flex items-center p-4 hover:bg-gray-700 hover:rounded-md text-purple-400">
//                 <LogOutIcon className="h-6 w-6 mr-2" /> Logout
//               </UserLogout>
//             </>
//           ) : (
//             <>
//               <Button className='text-purple-400'>
//                 <Link href="/signin">Sign In</Link>
//               </Button>
//               <Button className='text-purple-400'>
//                 <Link href="/home">Home</Link>
//               </Button>
//             </>
//           )}
//         </nav>
//       </motion.div>

//       {/* Bottom Navbar for mobile */}
//       <motion.div
//         className="fixed bottom-0 left-0 right-0 flex justify-around bg-gray-900 text-white p-4 md:hidden"
//         initial="hidden"
//         animate="visible"
//         variants={sidebarVariants}
//         transition={{ type: 'spring', stiffness: 120 }}
//       >
//         <Link href="/home" className="flex flex-col items-center text-purple-400">
//           <HomeIcon className="h-6 w-6" />
//           <span>Home</span>
//         </Link>
//         <Link href={`/${session?.user?.name}/projects`} className="flex flex-col items-center text-purple-400">
//           <FolderIcon className="h-6 w-6" />
//           <span>Your Projects</span>
//         </Link>
//         <Link href={`/${session?.user?.name}`} className="flex flex-col items-center text-purple-400">
//           <UserIcon className="h-6 w-6" />
//           <span>Profile</span>
//         </Link>
//         <Link href="/new" className="flex flex-col items-center text-purple-400">
//           <PlusCircleIcon className="h-6 w-6" />
//           <span>New</span>
//         </Link>
//         <Link href="/bookmarks" className="flex flex-col items-center text-purple-400">
//           <BookmarkIcon className="h-6 w-6" />
//           <span>Bookmarks</span>
//         </Link>
//       </motion.div>
//     </div>
//   );
// }









// 'use client';

// import { motion } from 'framer-motion';
// import { useSession } from 'next-auth/react';
// import { Button } from '@/components/ui/button';
// import UserLogout from '../UserLogout';
// import Link from 'next/link';
// import { 
//   CodeIcon, 
//   HomeIcon, 
//   PlusCircleIcon, 
//   FolderIcon, 
//   BookmarkIcon, 
//   UserIcon, 
//   LogOutIcon 
// } from 'lucide-react';

// export default function Sidebar() {
//   const { data: session, status } = useSession();

//   const sidebarVariants = {
//     hidden: { width: '4rem' }, // Only show icons
//     visible: { width: '12rem' }, // Expand to show icons and text
//   };

//   if (status === 'loading') {
//     return <p>Loading...</p>;
//   }

//   // Check if session is not null
//   const isLoggedIn = session?.user !== undefined;

//   return (
//     <div className="relative">
//       {/* Sidebar for desktop */}
//       <motion.div
//         className="fixed top-16 left-0 bg-gray-900 text-white shadow-lg m-4 border rounded-md hidden md:block overflow-hidden"
//         initial="hidden"
//         animate="visible"
//         variants={sidebarVariants}
//         transition={{ type: 'spring', stiffness: 120 }}
//         whileHover="visible" // Trigger animation on hover
//       >
//         <nav className="mt-2 flex flex-col space-y-2">
//           {isLoggedIn ? (
//             <>
//               <Link href="/home" className="flex items-center p-4 hover:bg-gray-700 text-purple-400">
//                 <HomeIcon className="h-6 w-6" />
//                 <motion.span
//                   className="ml-2"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.1 }}
//                 >
//                   Home
//                 </motion.span>
//               </Link>

//               <Link href={`/${session?.user?.name}/projects`} className="flex items-center p-4 hover:bg-gray-700 text-purple-400">
//                 <FolderIcon className="h-6 w-6" />
//                 <motion.span
//                   className="ml-2"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.1 }}
//                 >
//                   Your Projects
//                 </motion.span>
//               </Link>

//               <Link href={`/${session?.user?.name}`} className="flex items-center p-4 hover:bg-gray-700 text-purple-400">
//                 <UserIcon className="h-6 w-6" />
//                 <motion.span
//                   className="ml-2"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.1 }}
//                 >
//                   Profile
//                 </motion.span>
//               </Link>

//               <Link href="/new" className="flex items-center p-4 hover:bg-gray-700 text-purple-400">
//                 <PlusCircleIcon className="h-6 w-6" />
//                 <motion.span
//                   className="ml-2"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.1 }}
//                 >
//                   Create Project
//                 </motion.span>
//               </Link>

//               <Link href={`/${session?.user?.name}/bookmarks`} className="flex items-center p-4 hover:bg-gray-700 text-purple-400">
//                 <BookmarkIcon className="h-6 w-6" />
//                 <motion.span
//                   className="ml-2"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.1 }}
//                 >
//                   Bookmarks
//                 </motion.span>
//               </Link>

//               <UserLogout className="flex items-center p-4 hover:bg-gray-700 text-purple-400">
//                 <LogOutIcon className="h-6 w-6" />
//                 <motion.span
//                   className="ml-2"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.1 }}
//                 >
//                   Logout
//                 </motion.span>
//               </UserLogout>
//             </>
//           ) : (
//             <>
//               <Button className="text-purple-400 p-4">
//                 <Link href="/signin">
//                   <HomeIcon className="h-6 w-6" />
//                   <motion.span
//                     className="ml-2"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.1 }}
//                   >
//                     Sign In
//                   </motion.span>
//                 </Link>
//               </Button>

//               <Button className="text-purple-400 p-4">
//                 <Link href="/home">
//                   <HomeIcon className="h-6 w-6" />
//                   <motion.span
//                     className="ml-2"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.1 }}
//                   >
//                     Home
//                   </motion.span>
//                 </Link>
//               </Button>
//             </>
//           )}
//         </nav>
//       </motion.div>

//       {/* Bottom Navbar for mobile */}
//       <motion.div
//         className="fixed bottom-0 left-0 right-0 flex justify-around bg-gray-900 text-white p-4 md:hidden"
//         initial="hidden"
//         animate="visible"
//         variants={sidebarVariants}
//         transition={{ type: 'spring', stiffness: 120 }}
//       >
//         <Link href="/home" className="flex flex-col items-center text-purple-400">
//           <HomeIcon className="h-6 w-6" />
//           <span>Home</span>
//         </Link>
//         <Link href={`/${session?.user?.name}/projects`} className="flex flex-col items-center text-purple-400">
//           <FolderIcon className="h-6 w-6" />
//           <span>Your Projects</span>
//         </Link>
//         <Link href={`/${session?.user?.name}`} className="flex flex-col items-center text-purple-400">
//           <UserIcon className="h-6 w-6" />
//           <span>Profile</span>
//         </Link>
//         <Link href="/new" className="flex flex-col items-center text-purple-400">
//           <PlusCircleIcon className="h-6 w-6" />
//           <span>New</span>
//         </Link>
//         <Link href="/bookmarks" className="flex flex-col items-center text-purple-400">
//           <BookmarkIcon className="h-6 w-6" />
//           <span>Bookmarks</span>
//         </Link>
//       </motion.div>
//     </div>
//   );
// }






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
    collapsed: { width: '4rem' },
    expanded: { width: '12rem' }, // Wider for better readability
  };

  const textVariants = {
    collapsed: { opacity: 0, x: -10, display: 'none' },
    expanded: { opacity: 1, x: 0, display: 'block' },
  };

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  const isLoggedIn = session?.user !== undefined;

  return (
    <motion.div
      className="fixed top-28 left-0 m-4 bg-gray-900 text-white shadow-lg border-r-4 border-gray-700 flex flex-col p-4"
      initial="collapsed"
      whileHover="expanded"
      animate="collapsed"
      variants={sidebarVariants}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <nav className="flex flex-col space-y-6">
        {isLoggedIn ? (
          <>
            {/* Home */}
            <Link href="/home" className="flex items-center space-x-4">
              <HomeIcon className="h-6 w-6 text-purple-400" />
              <motion.span
                className="text-purple-400"
                variants={textVariants}
                transition={{ duration: 0.3 }}
              >
                Home
              </motion.span>
            </Link>

            {/* Your Projects */}
            <Link href={`/${session?.user?.name}/projects`} className="flex items-center space-x-4">
              <FolderIcon className="h-6 w-6 text-purple-400" />
              <motion.span
                className="text-purple-400"
                variants={textVariants}
                transition={{ duration: 0.3 }}
              >
                Your Projects
              </motion.span>
            </Link>

            {/* Profile */}
            <Link href={`/${session?.user?.name}`} className="flex items-center space-x-4">
              <UserIcon className="h-6 w-6 text-purple-400" />
              <motion.span
                className="text-purple-400"
                variants={textVariants}
                transition={{ duration: 0.3 }}
              >
                Profile
              </motion.span>
            </Link>

            {/* Create Project */}
            <Link href="/new" className="flex items-center space-x-4">
              <PlusCircleIcon className="h-6 w-6 text-purple-400" />
              <motion.span
                className="text-purple-400"
                variants={textVariants}
                transition={{ duration: 0.3 }}
              >
                Create Project
              </motion.span>
            </Link>

            {/* Bookmarks */}
            <Link href={`/${session?.user?.name}/bookmarks`} className="flex items-center space-x-4">
              <BookmarkIcon className="h-6 w-6 text-purple-400" />
              <motion.span
                className="text-purple-400"
                variants={textVariants}
                transition={{ duration: 0.3 }}
              >
                Bookmarks
              </motion.span>
            </Link>

            {/* Logout */}
            <Link href="#" className="flex items-center space-x-4">
              <LogOutIcon className="h-6 w-6 text-purple-400" />
              <motion.span
                className="text-purple-400"
                variants={textVariants}
                transition={{ duration: 0.3 }}
              >
                Logout
              </motion.span>
              <UserLogout />
            </Link>
          </>
        ) : (
          <>
            <Button className="text-purple-400 flex items-center space-x-4">
              <Link href="/signin">
                <HomeIcon className="h-6 w-6 text-purple-400" />
                <motion.span
                  className="text-purple-400"
                  variants={textVariants}
                  transition={{ duration: 0.3 }}
                >
                  Sign In
                </motion.span>
              </Link>
            </Button>

            <Button className="text-purple-400 flex items-center space-x-4">
              <Link href="/home">
                <HomeIcon className="h-6 w-6 text-purple-400" />
                <motion.span
                  className="text-purple-400"
                  variants={textVariants}
                  transition={{ duration: 0.3 }}
                >
                  Home
                </motion.span>
              </Link>
            </Button>
          </>
        )}
      </nav>
    </motion.div>
  );
}
