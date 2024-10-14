import connectMongoDB from "@/lib/db";
import Event from "@/models/event";

export async function generateStaticParams() {
    const events = await fetch(`https://thepluto.xyz/api/events`, { method: 'GET' }).then(res => res.json());
   
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
        console.log('err finding item in daynamic test: ',error);
    }

    return (
        <div className="flex flex-col items-center justify-around">
            <h1>test number: {id}</h1>
            { event && <div>test result: {(JSON.stringify(event))}</div>}
        </div>
    )
}