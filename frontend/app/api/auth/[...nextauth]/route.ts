import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export interface IUserDetailsFromGithub {
  name: string;
  email: string;
  image: string;
  provider: string;
  providerId: string;
}

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name ?? "Can't Find",
          username: profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
      authorization: {
        params: {
          scope: "read:user user:email repo",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // 'user' is only available the first time this callback is run (on sign-in)
      if (user) {
        token.id = user.id;
        token.username = (user as any).username;
      }
      if (account?.provider === "github") {
        token.provider = "GITHUB";
        token.providerId = account.providerAccountId;
        token.githubAccessToken = account.access_token;
      }
      return token;
    },

    async session({ session, token }) {
      // Transfer data from the token to the session object
      if (session.user) {
        session.user.id = token.id as string;
        (session.user as any).username = token.username;
        (session.user as any).provider = token.provider;
        (session.user as any).providerId = token.providerId;

        // Shouldn't add in here
        // (session as any).githubAccessToken = token.githubAccessToken;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };

// const handler = NextAuth({
//   providers: [
//     GithubProvider({
//       clientId: process.env.AUTH_GITHUB_ID!,
//       clientSecret: process.env.AUTH_GITHUB_SECRET!,
//       profile(profile) {
//         return {
//           id: profile.id.toString(),
//           name: profile.name ?? profile.login, // Real name or fallback to username
//           fullname: profile.name,              // Pure real name (can be null)
//           email: profile.email,
//           image: profile.avatar_url,
//         };
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user, account }) {
//       // 'user' is only available the first time this callback is run (on sign-in)
//       if (user) {
//         token.id = user.id;
//         token.fullname = (user as any).fullname;
//       }
//       if (account?.provider === "github") {
//         token.provider = "GITHUB";
//         token.providerId = account.providerAccountId;
//       }
//       return token;
//     },

//     async session({ session, token }) {
//       // Transfer data from the token to the session object
//       if (session.user) {
//         session.user.id = token.id as string;
//         (session.user as any).fullname = token.fullname;
//         (session.user as any).provider = token.provider;
//         (session.user as any).providerId = token.providerId;
//       }
//       return session;
//     },
//   },
// });
