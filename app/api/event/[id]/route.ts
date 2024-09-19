import connectMongoDB from "@/lib/db";
import Event from "@/models/event";
import { NextResponse } from "next/server";

export async function GET(req: Request, {params} : { params: { id: string } }) {
    
    const id = params.id; // get id
    console.log('dynamic route: ', id);
    
    // self explanatory
    await connectMongoDB();
    // try to get items
    try {
        const event = await Event.findById(id);
        if (event) return NextResponse.json(event);
        else return NextResponse.json({ message: 'event unavailable' });
    }
    // err handling here..
    catch (error: any) {
        return NextResponse.json({ error: error.message });
    }

}

export async function DELETE(req: Request, {params} : { params: { id: string }}) {
    
    const id = params.id; // get id to delete
    await connectMongoDB();
    try {
        const event = await Event.findByIdAndDelete(id);
        console.log("event deleted successfully!");
        return NextResponse.json({ message: 'event deleted susscessfully! '});
    } 
    // other type of errs
    catch (error: any) {
        return NextResponse.json({ error: error.message });
    }
}


export async function PUT(req: Request, {params} : { params: { id: string }}) {

    const { data } = await req.json();
    console.log(data);
    const id = params.id;
    await connectMongoDB();

    try {
        const event = await Event.updateOne({ _id: id }, data );
        console.log('event updated successfully! ',event);
        
        if (event.acknowledged) 
            return NextResponse.json({ message: 'event updated successfully! '});
        else return NextResponse.json({ message: 'error updating event! '});
    } 

    // other type of errs
    catch (error: any) {
        console.log('err in updating event: ', error);
        return NextResponse.json({ error: error.message });
    }
    
}