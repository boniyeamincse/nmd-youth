import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or Phone", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.password) {
          throw new Error("ইমেইল/মোবাইল নম্বর ও পাসওয়ার্ড প্রদান করুন।");
        }

        const identifier = credentials.identifier.trim();

        // Find user by either email or phone
        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { email: identifier },
              { phone: identifier },
            ],
          },
        });

        if (!user || !user.passwordHash) {
          throw new Error("ভুল ইমেইল/মোবাইল অথবা পাসওয়ার্ড।");
        }

        const isValid = await bcrypt.compare(credentials.password, user.passwordHash);

        if (!isValid) {
          throw new Error("ভুল পাসওয়ার্ড। অনুগ্রহ করে পুনরায় চেষ্টা করুন।");
        }

        return {
          id: user.id,
          name: user.nameBn || user.nameEn,
          email: user.email,
          role: user.role,
          status: user.status,
          memberCode: user.memberCode || "",
          phone: user.phone,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.status = (user as any).status;
        token.memberCode = (user as any).memberCode;
        token.phone = (user as any).phone;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session.user as any).status = token.status;
        (session.user as any).memberCode = token.memberCode;
        (session.user as any).phone = token.phone;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "ndm-youth-movement-secure-jwt-secret-key-32chars",
};
