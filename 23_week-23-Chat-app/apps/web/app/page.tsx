"use client";
import { TextInput } from "@repo/ui/text-input";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div
      style={{
        overflow: "hidden",
        height:"100vh",
        width:"100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", padding:"20px", backgroundColor:"white",borderRadius:"10px" , gap:"10px" }}>
      <TextInput size="small" placeholder="Enter your name" />
      <button onClick={()=>{
       router.push("/chat/1")
      }}>Join The Room</button>
      </div>
    </div>
  );
}
