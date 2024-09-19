import connectMongoDB from "@/lib/db";
import Event from "@/models/event";

export async function generateStaticParams() {
    const events = await fetch(`https://evento-calicut.vercel.app/api/events`, { method: 'GET' }).then(res => res.json());
   
    return events.map((event: any) => ({
      id: event._id,
    }))
}

export default async function Page({ params }: { params: { id: string }}) {

    const id = params.id;
    let event: any;

    // self explanatory
    await connectMongoDB();

    // try to get items
    try {
        event = await Event.findById(id);
    }
    // err handling here..
    catch (error: any) {
        console.log(error);
    }
    console.log('event', event);

    return (
        <div>
            <h1>test number: {id}</h1>
        </div>
    )
}