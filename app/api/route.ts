import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  
  // Now you can access the `id` from session.user
  if (session) {
    console.log("session", session);
  }
//   return NextResponse({JSON: session})
}
