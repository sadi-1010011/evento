import connectMongoDB from "@/lib/db";
import Event from "@/models/event";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic' // dynamic route 

export async function GET(req: Request, {params} : { params: { catogory: string } }) {
    
    const catogory = params.catogory; // get catogory
    console.log('Route handler - fetch catogory: ',catogory)
    
    // self explanatory
    await connectMongoDB();

    // try to get items
    try {
        const events = await Event.find({ catogory: catogory});
        if (events) return NextResponse.json(events);
        else return NextResponse.json({ message: 'event unavailable' });
    }

    // err handling here..
    catch (error: any) {
        return NextResponse.json({ error: error.message });
    }

}