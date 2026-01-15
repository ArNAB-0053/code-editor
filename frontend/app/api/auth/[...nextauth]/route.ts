import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export interface IUserDetailsFromGithub {
    name: string;
    email: string,
    image: string;
    provider: string;
    providerId: string;
}

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
      authorization: {
        params: {
          scope: "read:user user:email repo",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Runs on sign-in
      if (account?.provider === "github") {
        token.provider = "GITHUB";
        token.providerId = account.providerAccountId; // providerId
      }
      return token;
    },

    async session({ session, token }) {
      // Expose to client
      if (session.user) {
        (session.user as any).provider = token.provider;
        (session.user as any).providerId = token.providerId;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
