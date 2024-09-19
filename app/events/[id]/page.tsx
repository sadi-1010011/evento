// export const dynamic = 'force-dynamic'; // force dynamic route
// export const fetchCache = 'force-no-store'; // disable vercel data cache!
export const dynamicParams = true // dynamic params ON!

import Image from "next/image";
import GalleryGrid from "@/components/gallerygrid/GalleryGrid";
// Loading skeleton
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
// ICONS
import HostIcon from "@/assets/icons/host_dark.png"
import LocationIcon from "@/assets/icons/location-pin.png";
import connectMongoDB from "@/lib/db";
import Event from "@/models/event";
import EditDelete from "@/components/adminFeatures/adminFeature";

export async function generateStaticParams() {
    const events = await fetch(`https://evento-calicut.vercel.app/api/events`, { method: 'GET', next: { revalidate: 60 } }).then(res => res.json());
   
    return events.map((event: any) => ({
      id: event._id,
    }))
}

export default async function EventPage({ params }: { params: { id: string }}) {

    let id = params.id;
    let event: any;

    // self explanatory
    await connectMongoDB();

    // try to get items
    try {
        let data = await Event.findById(id);
        event = JSON.parse(JSON.stringify(data));
    }
    // err handling here..
    catch (error: any) {
        console.log(error);
    }

    return (
        <main className="flex min-h-screen flex-col">
            <GalleryGrid />
            {
                !event ? 
                (<div className="my-4 px-6">
                    <SkeletonTheme baseColor="#202020" highlightColor="#444">
                        <Skeleton height={120} className="my-2 rounded-md" count={1} />
                        <Skeleton height={20} className="w-1/2" count={1} />
                        <Skeleton height={50} width={50} className="m-2" borderRadius="50%" count={1} />
                        <Skeleton height={25} className="w-1/3" count={1} />
                        <Skeleton height={25} className="" count={1} />
                    </SkeletonTheme>
                </div>)
                :
            
            (
            <>
            <div className="px-4">
                <h1 className="text-left my-6 pt-2 text-2xl font-semibold capitalize">{ event ? event.title : 'Title here..' }</h1>
                <div className="flex items-center my-6">
                    <Image className="rounded-full mr-3 bg-white p-0.5" src={HostIcon} width={50} height={50} alt="host icon" />
                    <h3 className="capitalize">{ event ? `hosted by ${event.hostname}` : 'host name'}</h3>
                </div>

                <hr style={{ width: '90%', display: 'block', margin: 'auto'}} />
                
                <p className="my-6 pl-2 text-gray-600">{ event ? event.description : 'description..'}</p>
                <div className="flex items-center m-2">
                    <Image className="bg-white p-1.5 rounded-full" src={LocationIcon} width={35} height={35} alt="location icon" />
                    <span className="px-2">{ event ? event.location : 'location..'}</span>
                </div>

                <hr style={{ width: '90%', display: 'block', margin: '1.4rem auto'}} />

                <div className="pl-2 pb-10">
                    <h2>Date</h2>
                    <h1>{ event ? event.date : 'Date..' }</h1>
                </div>
            </div>


            {/* ADMIN ONLY FEATURE !!! */}

                <EditDelete id={event._id} />

            {/* -- END -- */}


            <div className="flex items-center justify-between p-3 fixed bottom-0 right-0 left-0 bg-slate-300 text-black">
                <h2 className="font-bold">Total price</h2>
                <span className="font-bold ">{ event ? event.ticketprice : 'free '} $</span>
            </div>
            </>
            )
        }
        </main>
    );
}