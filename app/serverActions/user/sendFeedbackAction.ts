"use server"

import connectMongoDB from "@/lib/db";
import User from "@/models/user";
import { DateTime } from "luxon";


export default async function sendFeedbackAction(feedback: string, userId: string = '') {

    const feedbackDate = DateTime.now();

    // self explanatory
    await connectMongoDB();

    if (userId) {

        try {
            const user = await User.findById(userId); // find user
            if (user) {
                // SAVE to DB OR EMAIL DEVELOPER
                const feedbackFormated = {
                    user: user.username,
                    feedback: feedback,
                    feedbackdate: feedbackDate
                }
                console.log(feedbackFormated);
                return true;
            }
        }
        
        // err handling here..
        catch (error: any) {
            console.log('error saving feedback: ', error);
            return 'error saving feedback!';
        }
    }

    else {
        // SAVE to DB OR EMAIL DEVELOPER
        const feedbackFormated = {
            user: 'unknown',
            feedback: feedback,
            feedbackdate: feedbackDate
        }
        console.log(feedbackFormated);
        return true;
    }
}