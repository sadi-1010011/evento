// export const dynamic = 'force-dynamic'; // force dynamic route
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
// import EditDelete from "@/components/adminFeatures/adminFeature";

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
            <GalleryGrid images={ event.thumbnail } />
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
                

                <hr style={{ width: '90%', display: 'block', margin: '1.4rem auto'}} />


                <div className="flex items-center m-2">
                    <Image className="bg-white p-1.5 rounded-full" src={LocationIcon} width={35} height={35} alt="location icon" />
                    <span className="px-2">{ event ? event.location : 'location..'}</span>

                    {/* google map plot */}

                </div>

                <hr style={{ width: '90%', display: 'block', margin: '1.4rem auto'}} />

                <div className="pl-2 my-8">
                    <h2>Date</h2>
                    <h1>{ event ? event.date : 'Date..' }</h1>
                </div>

                <hr style={{ width: '90%', display: 'block', margin: '1.4rem auto'}} />

                <div className="my-4 pl-2">
                    <h1 className="text-lg font-semibold first-letter:capitalize">Availability</h1>
                    <span className="text-gray-600">1-6 Sept</span>
                </div>


                <hr style={{ width: '90%', display: 'block', margin: '1.4rem auto'}} />


                <h1 className="pl-2 my-4 text-lg font-semibold first-letter:capitalize" >What this event offers</h1>
                
                <div className="pl-2 my-6 flex-col items-start capitalize">
                    <div>Mountain view</div>
                    <div>Garden view</div>
                    <div>ice orathi</div>
                    <div>drinks, snacks</div>
                    <div>wifi</div>
                </div>

                <div className="flex my-6 mx-4 py-3 items-center justify-center rounded-md border-2 border-slate-800 hover:bg-slate-700 hover:text-white transition-all">
                    <h2 className="capitalize ">show all 23 amenities</h2>
                </div>


                <hr style={{ width: '90%', display: 'block', margin: '1.4rem auto'}} />


                <div className="pl-2 my-6 flex-col items-start capitalize">
                    <h1 className="text-lg font-semibold first-letter:capitalize">Guest Favorite</h1>
                    <span>This event is in top 10% of eligible listings based on ratings, reviews and reliability</span>
                </div>


                <hr style={{ width: '90%', display: 'block', margin: '1.4rem auto'}} />


                <div className="my-4 pl-2">
                    <h1 className="text-lg font-semibold first-letter:capitalize">Event rules</h1>
                    <span className="text-gray-600">start time: 4 pm</span>
                    <span className="text-gray-600">end time: 12 am</span>
                </div>





                <div className="flex my-6 mx-4 py-3 items-center justify-center rounded-md border-2 border-slate-800 hover:bg-slate-700 hover:text-white transition-all">
                    <h2 className="capitalize ">show all 47 reviews</h2>
                </div>


                <hr style={{ width: '90%', display: 'block', margin: '1.4rem auto'}} />


                <div className="my-4 pl-2">
                    <h1 className="text-lg font-semibold first-letter:capitalize">Cancellation Policy</h1>
                    <span className="text-gray-600">This reservation in non-refundable.</span>
                    <br />
                    <span className="text-gray-600">Review this Host full policy for details.</span>
                </div>


                <hr style={{ width: '90%', display: 'block', margin: '1.4rem auto'}} />


                
                <div className="my-4 pl-2">
                    <h1 className="text-lg font-semibold first-letter:capitalize">Safety & security</h1>
                    <span className="text-gray-600">smoke alarm</span>
                    <span className="text-gray-600">security guards</span>
                    <span className="text-gray-600">some spaces are shared</span>
                </div>

                <hr style={{ width: '90%', display: 'block', margin: '1.4rem auto'}} />


                <div className="my-4 pl-2">
                    <h1 className="text-md font-semibold text-gray-600 first-letter:capitalize">Report this event!</h1>
                </div>


                <hr style={{ width: '90%', display: 'block', margin: '1.4rem auto'}} />


            </div>




            {/* ADMIN ONLY FEATURE !!! */}

                {/* <div className="w-full">
                    <EditDelete id={event._id} />
                </div> */}

            {/* -- END -- */}

            <div className="flex items-center justify-between p-4 bg-gray-700 text-white">
                <h2 className="font-bold">Total price</h2>
                <span className="font-bold ">{ event ? event.ticketprice : 'free '} $</span>
            </div>  

            </>
            )
        }
        </main>
    );
}