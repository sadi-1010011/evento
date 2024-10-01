import connectMongoDB from "@/lib/db";
import User from "@/models/user";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic' // dynamic route 
export async function PUT(req: Request, {params} : { params: { id: string }}) {

    const userId = params.id;
    // const {data} = await req.json();
    // console.log('put request with: ', data);

    // await connectMongoDB();

    // try {
    //     const event = await User.updateOne({ _id: id }, data );
    //     console.log('event updated successfully! ',event);
        
    //     if (event.acknowledged) 
    //         return NextResponse.json({ message: 'event updated successfully! '});
    //     else return NextResponse.json({ message: 'error updating event! '});
    // } 

    // // other type of errs
    // catch (error: any) {
    //     console.log('err in updating event: ', error);
    //     return NextResponse.json({ error: error.message });
    // }
    return NextResponse.json('hi');
}