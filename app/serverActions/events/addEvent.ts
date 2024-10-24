"use server"

// SERVER ACTION TO FIND EVENTS BY CATOGORY

import connectMongoDB from "@/lib/db";
import Event from "@/models/event";

 
export async function addEvent(data: {}) {
    console.log('server action - add event: ',data);

    // self explanatory
    await connectMongoDB();

    try {
        // wait to store data
        let postresult = await Event.create(data);
        // revalidatePath('/events/[id]', 'page')
        if (postresult) return true;
        else return false;
    }

    // err handling here..
    catch (error: any) {
        console.log('error saving event: ', error);
        return 'error saving event!'; 
    }
}