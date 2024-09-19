import { get_eventById, put_eventById } from "@/app/(fetchAPI)/restAPI";
import CreateEventUI from "./uicomponent";
import connectMongoDB from "@/lib/db";
import Event from "@/models/event";


export async function generateStaticParams() {
    const events = await fetch(`https://evento-calicut.vercel.app/api/events`, { method: 'GET', next: { revalidate: 60 } }).then(res => res.json());
   
    return events.map((event: any) => ({
      id: event._id,
    }))
}

export default async function CreateEventPage({ params }: { params: { id: string }}) {

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
            <CreateEventUI data={eventdata} />
    );
}