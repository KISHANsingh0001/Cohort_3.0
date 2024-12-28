import { log } from "console";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text", placeholder: "Enter your username" },
                password: { label: "Password", type: "password" , placeholder: "Enter your password" },
                // Conform_password: { label: "Conform Password", type: "password" , placeholder: "Enter your Conform password" }
            },
            async authorize(credentials, req) {
                const username = credentials?.username;
                const password = credentials?.password;
                console.log("username", username);
                console.log("password", password);

                // db request to check if this username and password are valid
                
                const user = { id: 1, name: "J Smith", email: "abc@test.com" }

                if (user) {
                    return user;
                } else {
                    return null;
                }

            }
        }),
       GoogleProvider({
            clientId: "asd",
            clientSecret: "asd"  
       }),
       GithubProvider({
            clientId: "asd",
            clientSecret: "asd"  
       }),
      
        
    ],
    secret: process.env.NEXTAUTH_SECRET
});
export const GET = handler;
export const POST = handler;