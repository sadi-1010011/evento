import connectMongoDB from "@/lib/db";
import User from "@/models/user";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic' // dynamic route 
export async function PUT(req: Request, {params} : { params: { userId: string, eventId: string }}) {

    const userId = params.userId;
    const eventId = params.eventId;

    // console.log(`userid: ${userId}, eventid: ${eventId}`);

    await connectMongoDB();

    try {

        const user = await User.findById({ _id: userId }); // find user
        if (user) { // check user exist
            
            const { favorites } = user; // get favorites list
            favorites.push(eventId); // push new eventid
            const updatedUser = await User.findByIdAndUpdate(userId, { favorites }, { upsert: false });
            return NextResponse.json(updatedUser.favorites);
        }

        else {
            return NextResponse.json({ message: 'User does not exist!' });
        }
    
    } 

    // other type of errs
    catch (error: any) {
        console.log('err in updating user: ', error);
        return NextResponse.json({ error: error.message });
    }
}