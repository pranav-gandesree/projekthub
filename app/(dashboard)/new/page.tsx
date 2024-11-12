'use client';

import NewProject from "@/components/canvas/NewProject";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";



const Page = () => { 
  const { data: session } = useSession();

  if (!session) {
    redirect('/home');
  }

  return <NewProject />;
};

export default Page; 
