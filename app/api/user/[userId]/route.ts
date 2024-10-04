import connectMongoDB from "@/lib/db";
import User from "@/models/user";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic' // dynamic route 

 
export async function GET(req: Request, { params }: { params: { userId: string}} ) {
    
    const userId = params.userId;
    console.log('getting favorites info of: ', userId)
    await connectMongoDB();
    try {
        const user = await User.findById({ _id: userId }); // find user
        if (user) {
            let { email, username, favorites } = user; // get basic user info!
            // send back the info
            return NextResponse.json({ data: { email, username, favorites }});
        }
        else return NextResponse.json({ message: 'User does not exist!' });
    }
    // other type of errs
    catch (error: any) {
        console.log('err in finding user: ', error);
        return NextResponse.json({ error: error.message });
    }
}