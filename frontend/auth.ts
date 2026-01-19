import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const { auth, handlers } = NextAuth({
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
  // callbacks: {
  //   async jwt({ token, account }) {
  //     if (account?.access_token) {
  //       token.githubAccessToken = account.access_token;
  //     }
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     session.githubAccessToken = token.githubAccessToken as string;
  //     return session;
  //   },
  // },
});
