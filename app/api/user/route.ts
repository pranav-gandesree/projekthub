import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, username, password } = body;

        // Check if email already exists
        const existingUserByEmail = await prisma.user.findUnique({
            where: { email: email }
        });

        if (existingUserByEmail) {
            return NextResponse.json({
                user: null,
                message: "User with this email already exists"
            }, { status: 400 });
        }

        // Uncomment and use this if you want to check for existing username as well
        // const existingUserByUsername = await prisma.user.findUnique({
        //     where: { name: username }
        // });

        // if (existingUserByUsername) {
        //     return NextResponse.json({
        //         user: null,
        //         message: "User with this username already exists"
        //     }, { status: 400 });
        // }

        const hashedPassword = await hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                name: username,
                email,
                password: hashedPassword
            }
        });

        return NextResponse.json({
            message: "User created",
            user: newUser
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json({
            message: "An error occurred",
            error
        }, { status: 500 });
    }
}
