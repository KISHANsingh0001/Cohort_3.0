// Writing the backend routes in NEXT.JS

import { NextResponse } from "next/server";

export function GET() {// GET request
    return NextResponse.json({
        user: "KishanSinghThakur",
        email: "kishan@test.com"
    })
}
export function POST(){ // POST request
    return NextResponse.json({
        message: "Data created successfully"
    })
}

export function PUT(){ // PUT request
    return NextResponse.json({
        user: "KishanSinghThakur",
        email: "kishan@test.com",
        endpoint:"PUT"
    })
}

export function DELETE(){
    return NextResponse.json({
        msg:"Data is Deleted"
    })
}

