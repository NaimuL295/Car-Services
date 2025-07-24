// import { loginUser } from "@/app/actions/auth/loginUser";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import { collectionNamesObj } from "./bdConnect";


// export const authOptions = {
//     // Configure one or more authentication providers
//     providers: [
//         CredentialsProvider({
//             // The name to display on the sign in form (e.g. "Sign in with...")
//             name: "Credentials",
           
//             credentials: {
//                 email: { label: "Email", type: "text", placeholder: "Enter Email" },
//                 password: { label: "Password", type: "password" }
//             },
//             async authorize(credentials, req) {
//            //     console.log(credentials,"of")
//                 // Add logic here to look up the user from the credentials supplied
//                 const user = await loginUser(credentials)
            
//                 if (user) {
//                     // Any object returned will be saved in `user` property of the JWT
//                     return user
//                 } else {
//                     // If you return null then an error will be displayed advising the user to check their details.
//                     return null

//                     // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
//                 }
//             }
//         }),
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET
//         }),
    

//     ],
//     pages: {
//         signIn: "/login"
//     },
//     callbacks: {
//         async signIn({ user, account, profile, email, credentials }) {
//             // Console these to check necessary properites
//             //console.log({ user, account, profile, email, credentials })
//             if (account) {
//                 const { providerAccountId, provider } = account
//                 const { email: user_email, image, name } = user
//                 const userCollection = dbConnect(collectionNamesObj.user)
//                 const isExisted = await userCollection.findOne({ providerAccountId })
//                 if (!isExisted) {
//                     const payload = { providerAccountId, provider, email: user_email, image, name, }
//                     await userCollection.insertOne(payload)
//                 }
//             }
//             return true
//         },
//     }
// }
import { loginUser } from "@/app/actions/auth/loginUser";
import { collectionNamesObj, dbConnect } from "./bdConnect";
 import GoogleProvider from "next-auth/providers/google";




export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await loginUser(credentials);
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    // ✅ Fix: Save user info to DB for Google login
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const { providerAccountId, provider } = account;
        const { email, image, name } = user;

        const userCollection = dbConnect(collectionNamesObj.user);
        const isExisted = await userCollection.findOne({ providerAccountId });

        if (!isExisted) {
          await userCollection.insertOne({
            providerAccountId,
            provider,
            email,
            image,
            name,
          });
        }
      }
      return true;
    },

    // ✅ Required: Persist JWT token
    async jwt({ token, user }) {
      if (user) {
        token.id = user._id || user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
      }
      return token;
    },

    // ✅ Required: Make user info available in `useSession()`
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.image;
      }
      return session;
    },
  },
};
