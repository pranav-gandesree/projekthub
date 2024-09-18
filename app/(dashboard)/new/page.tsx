import NewProject from "@/components/canvas/NewProject"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getServerSession(authOptions);

  if(!session){
    redirect('/home')
  }

  return (
      <NewProject/>
  )
}

export default page
