
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import LandingPage from "@/components/canvas/LandingPage";
import { useEffect } from "react";

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
