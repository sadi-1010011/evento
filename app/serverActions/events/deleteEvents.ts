"use server"

// SERVER ACTION TO FIND EVENTS BY ID

import connectMongoDB from "@/lib/db";
import Event from "@/models/event";

 
export async function deletEventById(id: string) {
    console.log('server action - delete event by id: ',id);


    // self explanatory
    await connectMongoDB();

    // try to get items
    try {
        let data = await Event.findByIdAndDelete(id);
        return true;
    }
    // err handling here..
    catch (error: any) {
        console.log(error);
    }

}