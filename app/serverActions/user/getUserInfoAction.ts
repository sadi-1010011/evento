"use server";

import connectMongoDB from "@/lib/db";
import User from "@/models/user";

 
export async function getUserInfoAction(userId: string) {
    
    console.log('getting user info of: ', userId)

    await connectMongoDB();

    try {
        const user = await User.findById(userId); // find user
        if (user) {
            let { email, username, favorites, profileurlkey, sharedevents, likedevents } = user; // get necessary user info!
            // send back the info
            return JSON.parse(JSON.stringify(({ data: { email, username, favorites, profileurlkey, sharedevents, likedevents }, message: 'success'})));
        }
        else return JSON.parse(JSON.stringify(({ data: false, message: 'User does not exist!' })));
    }
    // other type of errs
    catch (error: any) {
        console.log('err in finding user: ', error);
        return JSON.parse(JSON.stringify(({ error: error.message })));
    }
}