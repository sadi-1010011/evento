import connectMongoDB from "@/lib/db";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";


export async function POST(req: Request) {

    const { username, email, password }  = await req.json();
    // console.log(username, email, password);
   
    // get connection
    await connectMongoDB();

    // check if user exists
    const existingUser = await User.findOne({ email })
    if (existingUser) return new NextResponse("Email is already registered!", { status: 400});

    const hashedPassword = await bcrypt.hash(password, 5); // SECURE PASSWORD BEFORE STORING!

    const newUser = new User({
        username,
        email,
        password: hashedPassword
    });
        

    try {
        // wait to save data
        await newUser.save();
        return NextResponse.json({message: "successfully registered user"},{status: 200});
    }

    catch (error: any) {
        console.log('catch block!', error)
        return NextResponse.json({ error: 'couldnt save to DB - server error!!'}, { status: 500});
    }

}