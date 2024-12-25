
import { NextRequest, NextResponse } from "next/server";
// making only single connection to our database
import  prismaClient  from "../../../lib/db";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        console.log(data);

     

        await prismaClient.user.create({
            data: {
                username: data.username,
                password: data.password 
            }
        });

        return NextResponse.json({ msg: 'User  created successfully' }, {status:201});
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
    }
}