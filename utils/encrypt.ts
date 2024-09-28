import { SignJWT } from "jose";

export async function encrypt(payload: any) {
    
    const secretkey = 'jeff mishal musk ibnu zukker the rocket scientist';
    const key = new TextEncoder().encode(secretkey);

    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256'})
        .setIssuedAt()
        .setExpirationTime('10 minutes from now')
        .sign(key);
}