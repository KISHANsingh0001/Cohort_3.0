"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactElement, useRef, useState } from "react";

export default function Signup() {
    const [username , setUsername] = useState("");
    const [password , setPassword] = useState("");
    const router  = useRouter();
    async function handleReq(){
        await axios.post("http://localhost:3000/api/v1/signup",{
            username,
            password
        })
       
        
    }
    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
        <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
                <div>
                    <div className="px-10">
                        <div className="text-3xl font-extrabold text-black ">
                            Sign Up
                        </div>
                    </div>
                    <div className="pt-2 flex flex-col justify-center items-center gap-5 ">
                        <div className="m-2"><input type="text" placeholder="Enter your Username" onChange={e=>{
                            setUsername(e.target.value);
                        }} /></div>
                        <div className="m-2"> <input type="password" placeholder="Enter your password" onChange={e=>{
                            setPassword(e.target.value);
                        }} /></div>
                        <button type="button" className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" onClick={handleReq}>Sign in</button>
                    </div>
                </div>
            </a>
        </div>
    </div>
}
