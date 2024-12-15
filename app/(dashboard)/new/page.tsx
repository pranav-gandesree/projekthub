"use client";

import NewProject from "@/components/canvas/NewProject";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from "react";

const Page = () => {
  
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/home'); 
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>; 
  }

  return <NewProject />;
};

export default Page;
