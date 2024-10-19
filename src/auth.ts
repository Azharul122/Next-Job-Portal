
import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
// import { signInSchema } from "./app/utils/verificationSchema";
// import UserModel, { createNewUser } from "./app/models/user";
// import startDb from "./app/lib/db";
import { isValidObjectId } from "mongoose";
import { signInSchema } from "./utils/verificationSchema";
import startDb from "./lib/connectToDB";
import UserModel, { createNewUser } from "./model/user.model";

export interface SessionUserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  verified: boolean;
}

declare module "next-auth" {
  interface Session {
    user: SessionUserProfile;
  }
}

class CustomError extends CredentialsSignin {
  constructor(message: string) {
    super(message);
    this.message = message;
  }
  code = "custom_error";
}

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
  unstable_update,
} = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials, request) {
        const result = signInSchema.safeParse(credentials);
        if (!result.success)
          throw new CustomError("Please provide a valid email & password!");

        const { email, password } = result.data;
        await startDb();
        const user = await UserModel.findOne({ email });
        if (!user?.compare(password))
          throw new CustomError("Email/Password mismatched!");

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          verified: user.verified,
          avatar: user.avatar?.url,
        };
      },
    }),
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  
  callbacks: {
    async signIn({ account, profile }) {
      // storing new user if the user is coming from google
      if (account?.provider === "google") {
        if (!profile?.email || !profile.name) return false;

        await startDb();
        const oldUser = await UserModel.findOne({ email: profile.email });
        if (!oldUser) {
          await createNewUser({
            name: profile.name,
            email: profile.email,
            provider: "google",
            verified: profile.email_verified || false,
            avatar: { url: profile.picture },
          });
        }
      }

      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        if (!isValidObjectId(user.id)) {
          const dbUser = await UserModel.findOne({ email: user.email });
          if (dbUser) {
            token = {
              ...token,
              id: dbUser.id,
              email: dbUser.email,
              name: dbUser.name,
              verified: dbUser.verified,
              avatar: dbUser.avatar?.url,
            };
          }
        } else {
          token = { ...token, ...user };
        }
      }

      if (trigger === "update") {
        token = { ...token, ...session };
      }

      return token;
    },
    session({ token, session }) {
      let user = token as typeof token & SessionUserProfile;

      if (token.user) {
        user = token.user as any;
      }

      if (user) {
        session.user = {
          ...session.user,
          id: user.id,
          email: user.email,
          name: user.name,
          verified: user.verified,
          avatar: user.avatar,
        };
      }

      return session;
    },
  },
});
