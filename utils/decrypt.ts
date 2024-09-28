import { jwtVerify } from "jose";

export async function decrypt(input: string): Promise<any> {
    
    const secretkey = 'jeff mishal musk ibnu zukker the rocket scientist';
    const key = new TextEncoder().encode(secretkey);

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