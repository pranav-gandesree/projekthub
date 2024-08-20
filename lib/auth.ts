// import  { NextAuthOptions } from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import GoogleProvider from 'next-auth/providers/google';
// import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import prisma from '@/prisma/prisma';
// import { compare } from 'bcryptjs';

// export const authOptions: NextAuthOptions = {
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         email: {
//           label: "Email",
//           type: "email",
//           placeholder: "example@example.com",
//         },
//         password: { label: "Password", type: "password" },
//       },

//       async authorize(credentials): Promise<any> {
//         console.log('Authorize called with:', credentials);
      
//         if (!credentials?.email || !credentials.password) {
//           console.log('Missing email or password');
//           return null;
//         }
      
//         const user = await prisma.user.findUnique({
//           where: {
//             email: credentials.email,
//           },
//         });
      
//         if (!user) {
//           console.log(`No user found with email: ${credentials.email}`);
//           return null;
//         }
      
//         console.log('User found:', user);
      
//         const isPasswordValid = await compare(credentials.password, user.password!);
//         console.log('Password comparison result:', isPasswordValid);
      
//         if (!isPasswordValid) {
//           console.log('Incorrect password for user:', user.email);
//           return null;
//         }
      
//         console.log('User authenticated successfully:', {
//           id: user.id,
//           email: user.email,
//           name: user.name,
//         });
      
//         return {
//           id: user.id,
//           email: user.email,
//           name: user.name,
//         };
//       }
      
//     }),


//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID || "",
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
//     }),
//   ],
//   session: {
//     strategy: 'jwt',
//   },
//   callbacks: {
//     jwt: async ({ user, token }: any) => {
//       if (user) {
//         token.uid = user.id;
//       }
//       return token;
//     },
//     session: ({ session, token }: any) => {
//       if (session.user) {
//         session.user.id = token.uid;
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: '/signin',
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };







import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/prisma/prisma';
import { compare } from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials): Promise<any> {
        console.log('Authorize called with:', credentials);
      
        if (!credentials?.email || !credentials.password) {
          console.log('Missing email or password');
          return null;
        }
      
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
      
        if (!user) {
          console.log(`No user found with email: ${credentials.email}`);
          return null;
        }
      
        console.log('User found:', user);
      
        const isPasswordValid = await compare(credentials.password, user.password!);
        console.log('Password comparison result:', isPasswordValid);
      
        if (!isPasswordValid) {
          console.log('Incorrect password for user:', user.email);
          return null;
        }
      
        console.log('User authenticated successfully:', {
          id: user.id,
          email: user.email,
          name: user.name,
        });
      
        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      }
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  session: {
    strategy: 'jwt', // Using JWT session strategy
  },
  callbacks: {
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;  // Add the user ID to the token
      }
      return token;
    },
    session: async ({ session, token }: any) => {
      if (session.user) {
        session.user.id = token.uid;  // Add the user ID to the session
      }
      return session;
    },
    
  },
  pages: {
    signIn: '/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
