// import bcrypt from 'bcrypt';
import prisma from '@/prisma/prisma';
import { compare } from 'bcryptjs';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
    providers:[
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@example.com",
                  },
                  password: { label: "Password", type: "password" },
              },
  
                async authorize(credentials: any ):Promise<any>{
                    if (!credentials?.email || !credentials.password) {
                        return null;
                  }
                
                  const user = await prisma.user.findUnique({
                    where: {
                      email: credentials.email,
                    },
                  });
                  
                  if (!user || !(await compare(credentials.password, user.password!))) {
                    return null;
                  }
          
                  return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    randomKey: "Hey cool",
                  };
                  
              }
         
        })
    ]
}

