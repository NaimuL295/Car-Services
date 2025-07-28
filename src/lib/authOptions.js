
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "@/app/actions/auth/loginUser"; // your login logic
import { collectionNamesObj, dbConnect } from "./bdConnect";


export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await loginUser(credentials);
        if (user) return user;
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  pages: {
    signIn: "/login", // custom login page
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
     
          const userCollection = await dbConnect(collectionNamesObj?.user);

          const existingUser = await userCollection.findOne({ email: profile.email });

          if (!existingUser) {
            await userCollection.insertOne({
              name: profile.name || user.name,
              email: profile.email || user.email,
              image: profile.picture || user.image,
              provider: account.provider,
              providerAccountId: account.providerAccountId,
              createdAt: new Date(),
              updatedAt: new Date(),
            });
          }
        } catch (err) {
          console.error("❌ Error saving Google user to DB:", err);
          return false; // block sign-in if error
        }
      }

      return true; // allow sign-in
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },

 
};
