"use server"

import connectMongoDB from "@/lib/db";
import User from "@/models/user";
import { encrypt } from "@/utils/encrypt";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";

export async function userLogin(formData: any) {
    
    let user;
    // get user data
    const email = formData.email;
    const password = formData.password;

    // handle user verification
    await connectMongoDB();
    
    try {
        user = await User.find({email: email});

        // user exists !
        if (user[0]?.email === email) {
            
            const passwordMatch = await bcrypt.compare(password, user[0].password);
            if (passwordMatch) {
                // create the session
                const duration = 24 * 60 * 60 * 1000 * 7; // one week
                const expires = new Date(Date.now() + duration); // expiry date
                const session = await encrypt({ user, expires }); // encrypt
            
                // save in a cookie
                cookies().set('session', session, { expires, httpOnly: true });
            }
            else {
                    return 'Incorrect password!';
                }
        }

        else return 'user does not exist!';
    
    }

    catch (error) {
        console.log('error in finding user from db! ', error);
    }
    
    // to profile
    // return (JSON.parse(JSON.stringify(user)));
}