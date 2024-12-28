// "use client";
import { getServerSession } from "next-auth";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Image from "next/image";

// export default function Home() {
  
//   return <SessionProvider>
//     <RealHome />
//   </SessionProvider>
// }

// function RealHome(){
//   const session = useSession();
//   return <div>
//    {session.status === "authenticated" ? (<button onClick={()=> signOut()}>Logout</button>) : (<button onClick={()=> signIn()}>Login</button>)}
//    {JSON.stringify(session)}
//   </div>
// }
export default async function Home(){
  const session = await getServerSession();
  return <div>
   {JSON.stringify(session)}
  </div>
}