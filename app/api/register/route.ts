import connectMongoDB from "@/lib/db";
import User from "@/models/user";
import { NextResponse } from "next/server";
// import bcrypt from "bcrypt";


export async function POST(req: Request) {

    const { data } = await req.json();
    console.log(data.email)

   
    // get connection
    await connectMongoDB();
    
    try {

        if (data) {
            // check if user exists
            const email = data.email;
            const existingUser = await User.findOne({ email })
            if (existingUser) return new NextResponse("Email is already registered!", { status: 400});
            // secure password
            // const hashedPassword = await bcrypt.hash(data.password, 5);
            
            // wait to store data
            await User.create(data);
        }

        return NextResponse.json({message: "successfully registered user"},{status: 200});
    }

    catch (error: any) {
        return NextResponse.json({ error: 'couldnt save to DB - server error!'}, { status: 500});
    }

}