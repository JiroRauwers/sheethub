/* eslint-disable no-unused-vars */
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "~/lib/db";
import { authConfig } from "./lib/auth.config";
import { Adapter } from "next-auth/adapters";

import * as Auth_ from "~/node_modules/next-auth/lib";
import * as Auth_Config from "~/node_modules/next-auth/lib/types";
import * as AuthProviders from "~/node_modules/next-auth/providers";

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
      if (token) {
        // set the token data to session
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.image as string | undefined;
      }

      return session;
    },

    redirect() {
      return "/login";
    },
  },
});
