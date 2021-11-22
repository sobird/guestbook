/**
 * All requests to /api/auth/* (signIn, callback, signOut, etc.) will automatically be handled by NextAuth.js.
 * 
 * sobird<i@sobird.me> at 2021/11/22 16:59:16 created.
 */


import NextAuth from "next-auth"
import Providers from "next-auth/providers"

export default NextAuth({
  session: {
    jwt: true,
  },
  // Configure one or more authentication providers
  providers: [
    // Providers.GitHub({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    // ...add more providers here
    Providers.Credentials({
      async authorize(credentials) {

        return {
          username: 'sobird'
        }
      }
    })
  ],
})