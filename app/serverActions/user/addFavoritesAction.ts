"use server"

// SERVER ACTION TO ADD FAVORITES

import connectMongoDB from "@/lib/db";
import User from "@/models/user";
import { revalidatePath } from "next/cache";

 
export async function addFavoritesAction(userId: string, favoritedId: string) {
    console.log('server action - add user favorites: ',userId);

    // self explanatory
    await connectMongoDB();

    try {

        const user = await User.findById({ _id: userId }); // find user
        if (user) { // check user exist
            
            let { favorites } = user; // get favorites list
            const alreadyfavorite = favorites.length && favorites.filter((eventid: string) => eventid === favoritedId);
            console.log('already fav > ',alreadyfavorite)
            // double check if alrady favorited!
            if (alreadyfavorite.length) return 'already favorited!'
            favorites.push(favoritedId)  // push new eventid
            const updatedUser = await User.findByIdAndUpdate(userId, { favorites: favorites }, { upsert: false });
            revalidatePath('/favorites');
            return JSON.parse(JSON.stringify(updatedUser.favorites));
        }
        else {
            return 'User does not exist!'
        }
        
    }

    // err handling here..
    catch (error: any) {
        console.log('error adding favorites: ', error);
        return 'error adding favorites!'; 
    }
}