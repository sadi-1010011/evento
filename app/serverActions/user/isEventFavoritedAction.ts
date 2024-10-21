"use server"

// SERVER ACTION TO GET FAVORITES

import connectMongoDB from "@/lib/db";
import User from "@/models/user";
 

export async function isEventFavoritedAction(eventId: string, userId: string) {

    // self explanatory
    await connectMongoDB();

    try {
        
        // find favs
        const user = await User.findById(userId);
        const favorites = user.favorites;

        const result = favorites.includes(eventId);
        if (result) return result;
        else return;
    }

    // err handling here..
    catch (error: any) {
        console.log('error fetching favorites: ', error);
        return 'error fetching favorites!'; 
    }
}