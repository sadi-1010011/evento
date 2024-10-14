// import { put_eventById } from "@/app/(fetchAPI)/restAPI";
import connectMongoDB from "@/lib/db";
import Event from "@/models/event";
import EditEventUI from "./uicomponent";

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
    const events = await fetch(`https://thepluto.xyz/api/events`, { method: 'GET', next: { revalidate: 60 } }).then(res => res.json());
   
    return events.map((event: any) => ({
      id: event._id,
    }))
}

export default async function EditEventPage({ params }: { params: { id: string }}) {

    let eventdata: any;
    const id = params.id;

    // get event by id

    // self explanatory
    await connectMongoDB();

    // try to get items
    try {
        let data = await Event.findById(id);
        eventdata = JSON.parse(JSON.stringify(data));
    }
    // err handling here..
    catch (error: any) {
        console.log(error);
        alert('could not get event by id!');
    }


    return ( 
            <EditEventUI data={eventdata} />
    );
}