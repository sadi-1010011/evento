// export const dynamic = 'force-dynamic'; // force dynamic route
export const revalidate = false;
export const dynamicParams = true // dynamic params ON!

import Image from "next/image";
import GalleryGrid from "@/components/gallerygrid/GalleryGrid";
// Loading skeleton
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
// ICONS
import VerifyIcon from "@/assets/icons/verify.png";
import HostIcon from "@/assets/icons/host_dark.png";
import FavIcon from "@/assets/icons/heart-black.png";
import ShareIcon from "@/assets/icons/share-black.png";
import LocationIcon from "@/assets/icons/location-pin.png";
import EditDelete from "@/components/adminFeatures/adminFeature";
import EventReviews from "@/components/eventreviews/EventReviews";
import Event from "@/models/event";
import connectMongoDB from "@/lib/db";


export async function generateStaticParams() {
    const events = await fetch(`https://evento-calicut.vercel.app/api/events`, { method: 'GET' }).then(res => res.json());
   
    return events.map((event: any) => ({
      id: event._id,
    }))
}

export default async function EventPage({ params }: { params: { id: string }}) {

    let event: any;
    const id = params.id;

    console.log('dynamic page! eventId: ', id);

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

    // API CALL
    // const res = await fetch(`https://evento-calicut.vercel.app/api/events/${params.id}`, { method: 'GET' });
    // event = await res.json();
        
    // SERVER ACTION
    // getEventById(params.id).then(res => event = res);


    return (
        <main className="flex min-h-screen flex-col bg-evento-white text-black dark:bg-black dark:text-white pb-12">

            {/* Share, Favorite Btn */}
            <div className="flex gap-2 m-2 absolute right-2 top-2 z-10">
                <Image className="rounded-full bg-white p-1.5" src={ShareIcon} width={32} height={32} alt="share icon" />
                <Image className="rounded-full bg-white p-1.5" src={FavIcon} width={32} height={32} alt="favorite icon" />
            </div>
            <GalleryGrid images={ event ? event.thumbnail : '' } />
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
            <div>
                <div className="px-4">
                
                {/* TITLE, HOST */}
                <h1 className="text-left my-6 pt-2 text-2xl font-semibold capitalize">{ event ? event.title : 'Title here..' }</h1>
                <div className="flex items-center my-4">
                    <Image className="rounded-full mr-3 bg-white p-0.5" src={HostIcon} width={50} height={50} alt="host icon" />
                    <h3 className="capitalize">{ event ? `hosted by ${event.hostname}` : 'host name'}</h3>
                    <Image className="rounded-full bg-white px-0.5 ml-1.5" src={VerifyIcon} width={22} height={22} alt="verify icon" />
                </div>

                <hr style={{ width: '90%', display: 'block', margin: 'auto'}} />
                
                {/* DESCRIPTION */}
                <p className="my-6 pl-2 text-gray-600 dark:text-slate-200">{ event ? event.description : 'description..'}</p>               
                <hr style={{ width: '90%', display: 'block', margin: '1.4rem auto'}} />

                {/* LOCATION */}
                <div className="flex items-center -my-3">
                    <Image className="bg-white p-1.5 rounded-full" src={LocationIcon} width={35} height={35} alt="location icon" />
                    <span className="px-2">{ event ? event.location : 'location..'}</span>

                    {/* google map plot */}

                </div>
                <hr style={{ width: '90%', display: 'block', margin: '1.4rem auto'}} />

                {/* DATE */}
                <div className="pl-2 my-0">
                    <h2>Date</h2>
                    <h1>{ event ? event.date : 'Date..' }</h1>
                </div>
                <hr style={{ width: '90%', display: 'block', margin: '1.4rem auto'}} />


                {/* <div className="my-4 pl-2">
                    <h1 className="text-lg font-semibold first-letter:capitalize">Availability</h1>
                    <span className="text-gray-600 dark:text-slate-200">1-6 Sept</span>
                </div>
                <hr style={{ width: '90%', display: 'block', margin: '1.4rem auto'}} /> */}


                <div className="my-0 pl-2">
                    <h1 className="text-lg font-semibold first-letter:capitalize">Event Timing</h1>
                    <span className="text-gray-600 dark:text-slate-200">start time: 4 pm</span> &nbsp;
                    {/* <span className="text-gray-600 dark:text-slate-200">end time: 12 am</span> */}
                </div>

                <div className="mt-8 mb-2">
                    <EventReviews />
                </div>


                {/* <div className="my-4 pl-2">
                    <h1 className="text-md font-semibold text-gray-600 dark:text-slate-200 first-letter:capitalize">Report this event!</h1>
                </div> */}

            </div>

            {/* ADMIN ONLY FEATURE !!! */}

                <EditDelete id={event._id} />

            {/* -- END -- */}

            <div className="fixed bottom-0 left-0 right-0 w-full flex items-center justify-between py-4 px-4 bg-gray-700 text-white">
                <h2 className="font-bold text-lg">Total price</h2>
                <span className="font-bold text-lg">{ event ? event.ticketprice : 'free '} $</span>
            </div>  

            </div>
            )
        }
        </main>
    );
}