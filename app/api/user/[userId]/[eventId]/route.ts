import connectMongoDB from "@/lib/db";
import User from "@/models/user";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic' // dynamic route 


export async function PUT(req: Request, { params } : { params: { userId: string, eventId: string }}) {

    const userId = params.userId;
    const eventId = params.eventId;

    // console.log(`userid: ${userId}, eventid: ${eventId}`);

    await connectMongoDB();

    try {

        const user = await User.findById({ _id: userId }); // find user
        if (user) { // check user exist
            
            let { favorites } = user; // get favorites list
            const alreadyfavorite = favorites.length ? favorites.filter((eventid: string) => eventid === eventId) : false ;
            // double check if alrady favorited!
            if (alreadyfavorite) return NextResponse.json({ message: 'already favorited!'});
            favorites.push(eventId)  // push new eventid
            const updatedUser = await User.findByIdAndUpdate(userId, { favorites: favorites }, { upsert: false });
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


export async function DELETE(req: Request, {params} : { params: { userId: string, eventId: string }}) {

    const userId = params.userId;
    const eventId = params.eventId;

    console.log(`userid: ${userId}, eventid: ${eventId}`);

    await connectMongoDB();

    try {

        const user = await User.findById({ _id: userId }); // find user
        if (user) { // check user exist
            
            const { favorites } = user; // get favorites list
            // remove the unfavorited event
            console.log('before filter: ', favorites)
            const updatedfavorites = favorites.filter((eventid: string) => eventid != eventId);
            console.log('after filter: ', updatedfavorites)

            const updatedUser = await User.findByIdAndUpdate(userId, { favorites: updatedfavorites }, { upsert: false });
            console.log(updatedUser.favorites)
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