import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CodeIcon } from "lucide-react";
import Link from "next/link";
import { SheetDemo } from "./canvas/SheetDemo";
import { Button } from "@/components/ui/button";

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="py-2 h-20 fixed top-0 flex flex-row justify-between items-center w-full z-[999] right-0 px-4 bg-slate-900 shadow-lg">
      <Link href='/home' className="flex flex-row items-center ml-4">
        <CodeIcon className="h-9 w-9 text-purple-400" />
        <h1 className="text-purple-400 text-2xl ml-2">projectHub</h1> {/* Adjusted spacing */}
      </Link>
      
      <div className="flex justify-end">
  
      <div className="flex items-center space-x-4">
        {session?.user ? (
          <>
            {session.user.email && (
              <span className="text-white">{session.user.email}</span>
            )}
            {session.user.image && (
              <Avatar>
                <AvatarImage src={session.user.image} />
                <AvatarFallback>{session.user.name}</AvatarFallback>
              </Avatar>
            )}
          </>
        ) : (
          <Link href="/api/auth/signin">
            <Button variant="outline" className="text-black border-white">
              Sign In
            </Button>
          </Link>
        )}
      </div>

      {session?.user && <SheetDemo />}
      </div>
    </div>
  );
};

export default Navbar;
