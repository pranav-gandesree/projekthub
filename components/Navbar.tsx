import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Button } from "./ui/button";
import UserLogout from "./UserLogout";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="bg-transparent py-2 fixed w-full z-10 top-3">
      <div className="container flex ">
        <Link  className="text-2xl" href="/">Logo</Link>
        <div className=" container flex items-center justify-end">
          {session?.user ? (
            <UserLogout />
          ) : (
            <Button>
              <Link href="/signin">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
