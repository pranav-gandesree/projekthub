'use client'

import NewProject from "@/components/canvas/NewProject";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/lib/auth";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const page = () => {
 
  const {data:session} = useSession(); 

  if (!session) {
    redirect('/home');
  }

  return <NewProject />;
};

export default page;
