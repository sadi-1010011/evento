import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./decrypt";
import { encrypt } from "./encrypt";

export async function updateSession(req: NextRequest) {

    const session = req.cookies.get('session')?.value;
    if (!session) return;
    
    // refresh the session
    const duration = 60 * 60 * 24 * 7 * 1000; // 1 week
    const parsed = await decrypt(session);
    parsed.expires = new Date(Date.now() + duration);

    const res = NextResponse.next();

    res.cookies.set({
        name: 'session',
        value: await encrypt(parsed),
        httpOnly: true,
        expires: parsed.expires,
    });

    return res;
}