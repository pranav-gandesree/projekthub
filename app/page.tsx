import { Button } from "@/components/ui/button";
import User from "@/components/User";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default  async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <>
      <div className="text-2xl">
        A  place to showcase your projectss 
        share your projects profile just like you share your github profile 
      </div>
      
      <Link href='/home'>
      <Button variant='secondary'>Admin </Button>
      </Link>
      <Button>
              <Link href="/signin">Sign In</Link>
      </Button>

      <h2>client sessionn </h2>
      <User/>
      <h2>Server session</h2>
      {JSON.stringify(session)}
    </>
  );
}
