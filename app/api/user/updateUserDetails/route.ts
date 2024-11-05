import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prisma";
import { getServerSession } from "next-auth"; 
import * as z from 'zod';

const UserDetailsSchema = z.object({
    userId: z.string(),
    twitter: z.string().optional(), 
    github: z.string().optional(),  
    portfolio: z.string().optional(),
    bio: z.string().optional(), 
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { userId, twitter, github, portfolio, bio } = UserDetailsSchema.parse(body);

        const session = await getServerSession(); 
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        
        const updatedUserDetails = await prisma.userDetails.upsert({
            where: { userId }, // Assumes userId is unique
            update: { twitter, github, portfolio, bio }, 
            create: { userId, twitter, github, portfolio, bio } 
            
        });

        if(updatedUserDetails){
            console.log("updated the user details")
        }

        return NextResponse.json({
            updatedUserDetails,
            message: "User details updated successfully"
        }, { status: 201 });

    } catch (err) {
        console.error(err); 
        return NextResponse.json({ error: "Failed to update user details" }, { status: 500 });
    }
}
