"use server"

// SERVER ACTION TO increment like count in user profile

import connectMongoDB from "@/lib/db";
import User from "@/models/user";

export async function IncrementLikeCount(userId: string, eventId: string) {
    // self explanatory
    await connectMongoDB();

    try {
        
        // find user
        const user = await User.findById(userId);
        const { likedevents } = user;
        if (likedevents.length === 0) likedevents.push(String(eventId))
            else {
                    let alreadycounted = likedevents.includes(String(eventId));
                    if (!alreadycounted) likedevents.push(String(eventId));
                    else console.log('already incremented this event')
        }
        const updatedUser = await User.findByIdAndUpdate(userId, { likedevents: likedevents }, { upsert: true });
        return likedevents.length;

    }

    // err handling here..
    catch (error: any) {
        console.log('error incrementing liked events count: ', error);
        return 'error incrementing liked events!'; 
    }
}