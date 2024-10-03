import connectMongoDB from "@/lib/db";
import Event from "@/models/event";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic' // dynamic route 

export async function GET(req: Request, {params} : { params: { date: string } }) {
    
    // let date = new Date(params.date).toISOString(); // get date
    const date = params.date;
    console.log('dynamic events date route: ', date);
    
    // self explanatory
    await connectMongoDB();

    // try to get items
    try {
        const events = await Event.find({ date: { $gt: date } });
        if (events) return NextResponse.json(events);
        else return NextResponse.json({ message: 'event unavailable' });
    }

    // err handling here..
    catch (error: any) {
        return NextResponse.json({ error: error.message });
    }

}