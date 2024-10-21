"use server"

// SERVER ACTION TO increment share count in user profile

import connectMongoDB from "@/lib/db";
import User from "@/models/user";

export async function IncrementShareCount(userId: string, eventId: string) {
    // self explanatory
    await connectMongoDB();

    try {
        
        // find user
        const user = await User.findById(userId);
        const { sharedevents } = user;
        if (sharedevents.length === 0) sharedevents.push(String(eventId))
            else {
                    let alreadycounted = sharedevents.includes(String(eventId));
                    if (!alreadycounted) sharedevents.push(String(eventId));
                    else console.log('already incremented this event')
        }
        const updatedUser = await User.findByIdAndUpdate(userId, { sharedevents: sharedevents }, { upsert: true });
        console.log('updated sharedevents: ', updatedUser.sharedevents)
        return sharedevents.length;

    }

    // err handling here..
    catch (error: any) {
        console.log('error incrementing shared events count: ', error);
        return 'error incrementing shared events!'; 
    }
}