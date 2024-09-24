import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string | undefined;
      email: string;
      name: string;
      image?: string;
    };
  }

  interface JWT {
    uid: string;
    email?: string;
  }
}
