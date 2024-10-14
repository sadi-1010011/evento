"use server"

import connectMongoDB from "@/lib/db";
import Event from "@/models/event";

// SERVER ACTION TO FIND UPCOMING EVENTS
 
export async function getEventsByDateUpcomingAction(date: string) {
    console.log('server action - get events by date upcoming: ',date);

   // self explanatory
   await connectMongoDB();

   // try to get items
   try {
       const events = await Event.find({ date: { $gt: date } });
       console.log(events)
       if (events.length) return JSON.parse(JSON.stringify(events))
       else return { data: false} 
   }

   // err handling here..
   catch (error: any) {
        console.log('error fetching upcoming events: ', error);
        return 'error fetching upcoming events!'; 
   }
}