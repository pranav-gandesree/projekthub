import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import * as z from 'zod';

const userSchema = z
    .object({
        username: z.string().min(1, 'username is required').max(20),
        email: z.string().min(1,'email is required').email('Invalid Email'),
        password: z.string().min(1, 'password is required').min(8, 'password must have more than 8 characters') 
    })

export async function POST(req: Request) {
    try {
        const body = await req.json();
        let { email, username, password } = userSchema.parse(body);

        // Sanitize username by removing spcaces
        username = username.trim().replace(/\s+/g, '');
        console.log(username)

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
        const existingUserByUsername = await prisma.user.findUnique({
            where: { name: username }
        });

        if (existingUserByUsername) {
            return NextResponse.json({
                user: null,
                message: "User with this username already exists"
            }, { status: 400 });
        }

        const hashedPassword = await hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                name: username,
                email,
                password: hashedPassword
            }
        });

        const {password: newUserPassword, ...rest} = newUser;

        return NextResponse.json({
            message: "User created",
            user: rest
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json({
            message: "An error occurred",
            error
        }, { status: 500 });
    }
}
