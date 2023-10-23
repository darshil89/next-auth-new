import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { User } from "../../../../model/user-model";
const prisma = new PrismaClient();

export const authOptions  = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        if (user && user.password === credentials?.password) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, session }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          address: user.address,
          phone: user.phone,
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      if (token) {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.id,
            address: token.address,
            phone: token.phone,
          },
        };
      }

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.SECRET,
  debud: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
