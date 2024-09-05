import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className=" py-2 fixed w-full z-10 top-4 right-0 shadow-lg">
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
    </div>
  );
};

export default Navbar;
