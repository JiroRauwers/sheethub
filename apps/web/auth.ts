/* eslint-disable no-unused-vars */
import NextAuth, { User } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "~/lib/db";
import { authConfig } from "./lib/auth.config";
import { Adapter } from "next-auth/adapters";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(db) as Adapter, // type assertion to fix the error
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // get user from db with the email
        // if there is no user with the email, create new user
        // else set the user data to token

        console.log("user", user);
        let _user = await db.user.findUnique({
          where: {
            id: user.id ?? undefined,
          },
        });

        if (!_user)
          _user = await db.user.create({
            data: {
              email: user.email,
              name: user.name,
              image: user.image,
            },
          });

        token.user = Object.assign({}, token, user);
      }

      return token;
    },

    async session({ session, token }) {
      if (token?.user) {
        // set the token data to session
        const user = token.user as User;
        session.user.id = user.id as string;
        session.user.email = user.email as string;
        session.user.name = user.name as string;
        session.user.image = user.image as string | undefined;
      }

      return session;
    },

    redirect() {
      return "/login";
    },
  },
});
