"use server"

// SERVER ACTION TO UPDATE USER PROFILE
import connectMongoDB from "@/lib/db";
import User from "@/models/user";

 
export default async function addProfileLinkAction(userId: string, key: string) {
    console.log('server action - add user profile pic: ',key);

    // self explanatory
    await connectMongoDB();

    try {
        const user = await User.findById({ _id: userId }); // find user
        if (user) { // check user exist
            // wait to store data
            const updatedUser = await User.findByIdAndUpdate(userId, { profileurlkey: `${key}` }, { upsert: true });
            console.log(updatedUser)
            return true;
        }
    }

    // err handling here..
    catch (error: any) {
        console.log('error saving profile key: ', error);
        return 'error saving profile!'; 
    }
}