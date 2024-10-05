import connectMongoDB from "@/lib/db";
import Event from "@/models/event";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

// cache the events req
export const dynamic = 'force-static';
export const revalidate = 60; // new data in 1 mints

export async function GET() {
    // self explanatory
    await connectMongoDB();
    // try to get items
    try {
        const events = await Event.find({});
        if (events) return NextResponse.json(events);
        else return NextResponse.json({ message: 'no events available' });
    }
    // err handling here..
    catch (error: any) {
        return NextResponse.json({ error: error.message });
    }

}

export async function POST(req: Request) {

    // console.log(data);
    const { data } = await req.json();
    // console.log(data)

    // get connection
    await connectMongoDB();
    
    try {
        // wait to store data
        await Event.create(data);

        // update path
        revalidatePath('/api/events/[id]')
        return NextResponse.json({message: "successful post api"},{status: 201});
    }

    catch (error: any) {
        return NextResponse.json({ error: 'couldnt save to DB - server error!'});
    }

}