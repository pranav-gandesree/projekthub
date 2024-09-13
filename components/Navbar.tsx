import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CodeIcon } from "lucide-react";
import Link from "next/link";
import Logo from "@/public/logo.svg"
import { SheetDemo } from "./canvas/SheetDemo";
import { MenuIcon } from "lucide-react";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className=" py-2 flex flex-row justify-between w-full z-10 top-4 right-0 text-black shadow-lg">
      <Link href='/home'>
      <div className="flex flex-row ml-4 mt-2">
          <CodeIcon className="h-9 w-9 text-purple-400"/> 
          <h1 className="text-purple-400 text-2xl"> projectHub</h1>
      </div>
      </Link>
      <div className="container flex justify-end items-center px-6">
        <div className="flex items-center space-x-4">
          {session?.user?.email && (
            <span className="text-white">{session.user.email}</span>
          )}
          {session?.user?.image && (
           <Avatar>
           <AvatarImage src={session.user.image} />
           <AvatarFallback>{session.user.name}</AvatarFallback>
         </Avatar>
         
          )}
        </div>
      </div>

      <SheetDemo/>
    </div>
  );
};

export default Navbar;
