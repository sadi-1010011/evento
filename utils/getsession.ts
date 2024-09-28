import { cookies } from "next/headers";
import { decrypt } from "./decrypt";

export async function getSession() {
    
    // check if session exists?
    const session = cookies().get('session')?.value;
    // return nothing if no session
    if (!session) return null;
    // decrypt and return ssn
    return await decrypt(session);
    
}