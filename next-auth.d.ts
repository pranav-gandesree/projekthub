import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image?: string | null;
    };
  }

  interface JWT {
    uid: string;
    email?: string;
  }
}




// import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

// declare module 'next-auth' {
//   interface Session {
//     user: {
//       id: string;
//       email: string;
//       name: string;
//       image?: string | null;
//     } & DefaultSession['user'];
//   }

//   interface User extends DefaultUser {
//     id: string;
//   }

//   interface JWT {
//     uid: string;
//     email?: string;
//   }
// }




// import { DefaultSession } from "next-auth";

// declare module "next-auth" {
//   interface Session {
//     user?: {
//       id?: string; // Add id here if it doesn't exist
//     } & DefaultSession["user"];
//   }
// }