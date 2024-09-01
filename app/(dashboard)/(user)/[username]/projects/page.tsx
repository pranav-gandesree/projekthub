import UserProjects from "@/components/canvas/UserProjects";


export default function UserPage({ params }: { params: { username: string } }) {
  return <UserProjects username={params.username} />;
}

