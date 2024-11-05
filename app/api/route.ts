import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";


export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (session) {
    console.log("session", session);
  }
}
