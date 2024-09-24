// import { authOptions } from "@/lib/auth";
// import { getServerSession } from "next-auth";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { CodeIcon } from "lucide-react";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import Sidebar from "./canvas/Sidebar";
// import { SheetDemo } from "./canvas/SheetDemo";

// const Navbar = async () => {
//   const session = await getServerSession(authOptions);

//   return (
//     <div className="py-2 h-20 fixed top-0 flex flex-row justify-between items-center w-full z-[999] right-0 px-4 bg-slate-900 shadow-lg">
//       <Link href='/home' className="flex flex-row items-center ml-4">
//         <CodeIcon className="h-9 w-9 text-purple-400" />
//         <h1 className="text-purple-400 text-2xl ml-2">projectHub</h1>
//       </Link>

//       <div className=" hidden lg:flex justify-end items-center space-x-4">
//         {session?.user ? (
//           <>
//             <span className="text-white">{session.user.email}</span>
//             {session.user.image && (
//               <Avatar>
//                 <AvatarImage src={session.user.image} />
//                 <AvatarFallback>{session.user.name?.[0]}</AvatarFallback>
//               </Avatar>
//             )}
//           </>
//         ) : (
//           <>
//             <Link href="/api/auth/signin">
//               <Button variant="outline" className="text-white border-white">
//                 Sign In
//               </Button>
//             </Link>
//             <Link href="/portfolios">
//               <Button variant="outline" className="text-white border-white">
//                 Portfolios
//               </Button>
//             </Link>
//           </>
//         )}

//         {/* Sidebar Menu */}
//       </div>
//        {session && <Sidebar/>}
//     </div>
//   );
// };

// export default Navbar;









import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CodeIcon } from "lucide-react";
import Link from "next/link";
import Sidebar from "./canvas/Sidebar";
import { Button } from "./ui/button";

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="py-2 h-20 fixed top-0 flex flex-row justify-between items-center w-full z-[999] right-0 px-4 bg-slate-900 shadow-lg">
      <Link href='/home' className="flex flex-row items-center ml-4">
        <CodeIcon className="h-9 w-9 text-purple-400" />
        <h1 className="text-purple-400 text-2xl ml-2">projectHub</h1>
      </Link>

      {/* Show menu and email side by side */}
      <div className="flex flex-row items-center mb-2 space-x-12">
        {/* Sidebar (Menu) */}

        {/* Email and avatar */}
        {session?.user && session.user.email && (
          <div className="hidden md:flex items-center space-x-2">
            <span className="text-white">{session.user.email}</span>
            {session?.user?.image && (
              <Avatar>
                <AvatarImage src={session?.user?.image} />
                <AvatarFallback>{session?.user?.name?.[0]}</AvatarFallback>
              </Avatar>
            )}
          </div>
        )}
      
      {session ? (
  <Sidebar />
) : (
  <nav className="ml-auto flex gap-4">
    <Link href="/signin">
      <Button variant="secondary">Sign In</Button>
    </Link>
    <Link href="/portfolios">
      <Button variant="secondary">Discover portfolios</Button>
    </Link>
  </nav>
)}

      </div>
    </div>
  );
};

export default Navbar;
