"use server";

import { cookies } from "next/headers";

export async function userLogout() {
    // destroy session data
    cookies().set('session', '', { expires: new Date(0)} );
}