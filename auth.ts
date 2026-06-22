import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log("🔑 Authorize attempt:", credentials?.email);

        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          let user = await prisma.user.findUnique({
            where: { email: credentials.email as string }
          });

          if (!user) {
            console.log("📝 Creating new user:", credentials.email);
            user = await prisma.user.create({
              data: {
                email: credentials.email as string,
                name: credentials.email.toString().split('@')[0] || "User",
              }
            });
          }

          console.log("✅ User authorized:", user.id);

          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          console.error("❌ Authorize error:", error);
          return null;
        }
      }
    })
  ],
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }

      // Обновляем токен когда вызывается update()
      if (trigger === "update" && session?.name) {
        token.name = session.name;
      }

      // Всегда берём свежее имя из БД
      if (token.id) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: { name: true }
        });
        if (dbUser?.name) {
          token.name = dbUser.name;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
    newUser: "/auth/complete-profile",
  },
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
});