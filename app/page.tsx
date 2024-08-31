import { Button } from "@/components/ui/button";
import User from "@/components/User";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import LandingPage from "@/components/canvas/LandingPage";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/home'); 
  }

  return (
    <>
      {/* <Link href='/home' className="text-white">
        <Button variant='secondary'>Home</Button>
      </Link>
      <Button>
        <Link href="/signin">Sign In</Link>
      </Button> */}

      <LandingPage/>

      {/* <h2>Client session</h2>
      <User/>
      <h2>Server session</h2>
      {JSON.stringify(session)} */}
    </>
  );
}
