import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
    
      <div className="text-2xl">
        Home 
      </div>
      
      <Link href='/admin'>
      <Button variant='secondary'>Admin </Button>
      </Link>
    </>
  );
}
