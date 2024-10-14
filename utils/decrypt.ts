import { jwtVerify } from "jose";

export async function decrypt(input: string): Promise<any> {
    
    const key = new TextEncoder().encode(process.env.SESSION_ENCRYPT_SECRET);

    try {
        const { payload } = await jwtVerify(input, key, {
            algorithms: ['HS256']
        });
        return payload;
    }

    catch (error) {
        console.log('error verifying jwt token!', error);
    }


}