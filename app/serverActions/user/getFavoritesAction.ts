"use server"

// SERVER ACTION TO GET FAVORITES

import connectMongoDB from "@/lib/db";
import Event from "@/models/event";
 

export async function getFavoritesAction(eventId: [] ) {
    console.log('server action - get event by id: ',eventId);

    // self explanatory
    await connectMongoDB();

    try {
        
        // find event
        const events = await Event.find({ '_id': { $in: eventId } });

        if (events) { // check events exist
            return JSON.parse(JSON.stringify(events));
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