import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import Image from "next/image";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="bg-transparent py-2 fixed w-full z-10 top-4 right-0 shadow-lg">
      <div className="container flex justify-end items-center px-6">
        <div className="flex items-center space-x-4">
          {session?.user?.email && (
            <span className="text-white">{session.user.email}</span>
          )}
          {session?.user?.image && (
            <Image
              src={session.user.image}
              width={40}
              height={40}
              alt="User Profile"
              className="rounded-full border-2 border-white"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
