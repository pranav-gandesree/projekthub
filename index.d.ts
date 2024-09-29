// import NextAuth  from 'next-auth';
// import { DefaultSession } from 'next-auth';

import 'next-auth'
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      name: string;
      image?: string;
    } 
  }

  interface JWT {
    uid: string;
    email?: string;
  }
}
