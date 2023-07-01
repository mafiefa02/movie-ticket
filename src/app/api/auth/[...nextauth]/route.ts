import NextAuth from "next-auth";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";

import { prisma } from "@/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";

//import { PrismaAdapter } from "@next-auth/prisma-adapter";

const handler = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter<boolean>,
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    session({ session, user }) {
      session.user.balance = user.balance;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
