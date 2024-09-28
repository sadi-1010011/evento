import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./decrypt";
import { encrypt } from "./encrypt";

export async function updateSession(req: NextRequest) {

    const session = req.cookies.get('session')?.value;
    if (!session) return;
    
    // refresh the session
    const parsed = await decrypt(session);
    parsed.expires = new Date(Date.now() + 10 * 1000);

    const res = NextResponse.next();

    res.cookies.set({
        name: 'session',
        value: await encrypt(parsed),
        httpOnly: true,
        expires: parsed.expires,
    });

    return res;
}