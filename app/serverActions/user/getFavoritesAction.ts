"use server"

// SERVER ACTION TO GET FAVORITES

import connectMongoDB from "@/lib/db";
import Event from "@/models/event";
 
export async function getFavoritesAction(eventId: string ) {
    console.log('server action - get event by id: ',eventId);

    // self explanatory
    await connectMongoDB();

    try {

        const event = await Event.findById(eventId); // find event
        if (event) { // check event exist
            return JSON.parse(JSON.stringify(event));
        }
        else {
            return 'event unavailable!'
        }
        
    }

    // err handling here..
    catch (error: any) {
        console.log('error fetching favorites: ', error);
        return 'error fetching favorites!'; 
    }
}