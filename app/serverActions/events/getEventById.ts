"use server"

// SERVER ACTION TO FIND EVENTS BY ID

import connectMongoDB from "@/lib/db";
import Event from "@/models/event";

 
export async function getEventById(id: string) {
    console.log('server action - get events by id: ',id);


    // self explanatory
    await connectMongoDB();

    // try to get items
    try {
        let data = await Event.findById(id);
        const event = JSON.parse(JSON.stringify(data));
        return event;
    }
    // err handling here..
    catch (error: any) {
        console.log(error);
    }

}