import UserProjects from "@/components/canvas/UserProjects";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function projectsPage() {
  const session = await getServerSession(authOptions);


  return <UserProjects username={session?.user.name || ""} />;
}
