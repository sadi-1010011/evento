"use server"

import connectMongoDB from "@/lib/db";
import Event from "@/models/event";
import { NextResponse } from "next/server";

 
export async function getEventsByDateAction(date: string) {
    console.log('server action - get events by date: ',date);

    // self explanatory
    await connectMongoDB();

    // try to get items
    try {
        const events = await Event.find({ date: date });
        if (events) return JSON.parse(JSON.stringify(events));
        else return false;
    }

    // err handling here..
    catch (error: any) {
        console.log('error fetching today events: ', error);
        return 'error fetching today events!';
    }
}