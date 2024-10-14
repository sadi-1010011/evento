import { SignJWT } from "jose";

export async function encrypt(payload: any) {
    
    const key = new TextEncoder().encode(process.env.SESSION_ENCRYPT_SECRET);

    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256'})
        .setIssuedAt()
        .setExpirationTime('1 week from now')
        .sign(key);
}