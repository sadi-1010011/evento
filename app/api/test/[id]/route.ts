// import connectMongoDB from "@/lib/db";
// import Event from "@/models/event";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }: { params: { id: string }}) {

    const { data } = await req.json();
    console.log('=== START ===')
    console.log('Request methode: ', data);
    console.log('Request params: ', params.id);
    console.log('Request data: ', data);
    console.log('=== END ===')

    const requstInfo = [{
        'req type': req.method,
        'req params': params.id,
        'req data': data
    }];

    try {
        console.log('-- server action here..');
        return NextResponse.json(requstInfo);
    }

    // other type of errs
    catch (error: any) {
        console.log('-- err in server action : ', error);
        return NextResponse.json({ error: error.message });
    }
    
}