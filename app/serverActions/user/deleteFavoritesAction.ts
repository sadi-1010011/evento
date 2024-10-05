"use server"

// SERVER ACTION TO DELETE FAVORITES

import connectMongoDB from "@/lib/db";
import User from "@/models/user";

 
export async function deleteFavoritesAction(userId: string, favoritedId: string) {
    console.log('server action - delete user favorites: ',userId);

    // self explanatory
    await connectMongoDB();

    try {


        const user = await User.findById({ _id: userId }); // find user
        if (user) { // check user exist
            
            const { favorites } = user; // get favorites list
            // remove the unfavorited event
            const updatedfavorites = favorites.filter((eventid: string) => eventid != favoritedId);

            const updatedUser = await User.findByIdAndUpdate(userId, { favorites: updatedfavorites }, { upsert: false });
            console.log(updatedUser.favorites)
            return JSON.parse(JSON.stringify(updatedUser.favorites));
        }
        else {
            return 'User does not exist!'
        }
        
    }

    // err handling here..
    catch (error: any) {
        console.log('error deleting favorites: ', error);
        return 'error deleting favorites!'; 
    }
}