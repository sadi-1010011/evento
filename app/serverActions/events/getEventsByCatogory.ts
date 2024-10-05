"use server"

// SERVER ACTION TO FIND EVENTS BY CATOGORY

import connectMongoDB from "@/lib/db";
import Event from "@/models/event";

 
export async function getEventsByCatogory(catogory: string) {
    console.log('server action - get events by catogory: ',catogory);

    // self explanatory
    await connectMongoDB();

    try {
        const events = await Event.find({ catogory: catogory });
        if (events) return JSON.parse(JSON.stringify(events));
        else return false;
    }

    // err handling here..
    catch (error: any) {
        console.log('error fetching events by catogory: ', error);
        return 'error fetching events by catogory!'; 
    }
}