"use server"

// SERVER ACTION TO UPDATE USER PROFILE
import connectMongoDB from "@/lib/db";
import User from "@/models/user";

 
export default async function deleteProfileAction(userId: string) {
    console.log('server action - delete user profile pic: ',userId);

    // self explanatory
    await connectMongoDB();

    try {
        const user = await User.findById({ _id: userId }); // find user
        if (user) { // check user exist
            // wait to store data
            const updatedUser = await User.findByIdAndUpdate(userId, { profileurlkey: '' }, { upsert: false });
            return true;
        }
    }

    // err handling here..
    catch (error: any) {
        console.log('error deleting profile pic: ', error);
        return 'error deleting profile!'; 
    }
}