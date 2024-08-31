"use client"
import GalleryGrid from "@/components/gallerygrid/GalleryGrid";
import DummyImg from "@/assets/evento.jpeg";
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
        <main className="flex min-h-screen lg:min-w-10 flex-col bg-black">
            <GalleryGrid />
            {
                !event ? 
                (<div className="my-6">
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
                <h1 className="text-left my-4 pt-2 text-xl font-semibold capitalize">{ event ? event.title : 'loading..' }</h1>
                <div className="flex items-center">
                    <Image className="rounded-full mr-3" src={DummyImg} width={50} height={50} alt="host icon" />
                    <h3 className="capitalize">{ event ? event.hostname : 'host name'}</h3>
                </div>
                <p className="mt-3 pl-2 ">{ event ? event.description : 'loading..'}</p>
                <div className="flex items-center m-2">
                    <Image src={DummyImg} width={25} height={25} alt="location icon" />
                    <span className="px-2">{ event ? event.location : 'loading..'}</span>
                </div>
            </div>


            <button className="fixed top-4 right-6 bg-red-500 text-white capitalize text-sm font-semibold rounded-full p-2 px-3 border border-gray-700 ">
                {/* ADMIN ONLY FEATURE !!! */}
                <Link href={`/edit-event/${event ? event._id : false}`}>
                    edit event !
                    <br />
                    <span className="d-block font-light text-xs">{ `(admin only!)` }</span>
                </Link>
            </button>
            <button className="fixed top-4 left-6 bg-red-500 text-white capitalize text-sm font-semibold rounded-full p-2 px-3 border border-gray-700 ">
                <span onClick={ () => delete_eventById(event._id).then(res => { if (res.ok) router.back(); else alert('error in deleting event!'); }) }>
                    delete event !
                    <br />
                    <span className="d-block font-light text-xs">{ `(admin only!)` }</span>
                </span>
                {/* -- END -- */}
            </button>


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