import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const page = async () => {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (session?.user) {
    return <h2>welcome back admin {session.user.name}</h2>;
  }
  return <h2>Please login to checkout this page</h2>;
};

export default page;