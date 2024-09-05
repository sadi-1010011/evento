"use client" // client page
export const dynamic = 'force-dynamic'; // force dynamic route

import GalleryGrid from "@/components/gallerygrid/GalleryGrid";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
// APIs
import { get_eventById, delete_eventById } from "@/app/(fetchAPI)/restAPI";
// Loading skeleton
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
// ICONS
import DeleteIcon from "@/assets/icons/delete.png"
import EditIcon from "@/assets/icons/edit.png"
import HostIcon from "@/assets/icons/host_dark.png"
import LocationIcon from "@/assets/icons/location-pin.png";



export default function EventPage() {

    const [event, setEvent] = useState<any>();
    const router = useRouter();
    const params = useParams();
    const id = params.id;

    useEffect(() => {
        // fetch all data by id
        get_eventById(id).then((result) => {
                // console.log('found element by id', result)
                if (result) setEvent(result)
                else return;
            }
        )
    }, [id]);

    return (
        <main className="flex min-h-screen flex-col bg-black">
            <GalleryGrid />
            {
                !event ? 
                (<div className="my-4 px-3">
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
                
                <p className="my-6 pl-2 text-gray-300">{ event ? event.description : 'description..'}</p>
                <div className="flex items-center m-2">
                    <Image className="bg-white p-1.5 rounded-full" src={LocationIcon} width={35} height={35} alt="location icon" />
                    <span className="px-2">{ event ? event.location : 'location..'}</span>
                </div>

                <hr style={{ width: '90%', display: 'block', margin: '1.4rem auto'}} />

                <div className="pl-2">
                    <h2>Date</h2>
                    <h1>{ event ? event.date : 'Date..' }</h1>
                </div>
                

            </div>


            {/* ADMIN ONLY FEATURE !!! */}

            <div className="bg-slate-800 flex items-center justify-evenly py-2.5 bottom-0 absolute w-full">
                <button className="bg-red-500 text-white capitalize text-sm font-semibold rounded-full p-2 px-3">
                    <Link href={`/edit-event/${event ? event._id : false}`}>
                        <Image className="block m-auto" src={EditIcon} width={30} height={30} alt="edit icon" />
                    </Link>
                </button>

                <span className="d-block font-light text-xs">{ `(admin only!)` }</span>

                <button className="bg-red-500 text-white capitalize text-sm font-semibold rounded-full p-2 px-3">
                    <span onClick={ () => delete_eventById(event._id).then(res => { if (res.ok) router.back(); else alert('error in deleting event!'); }) }>
                        <Image className="block m-auto" src={DeleteIcon} width={30} height={30} alt="edit icon" />
                    </span>
                </button>
            </div>

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