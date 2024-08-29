"use client"
import GalleryGrid from "@/components/gallerygrid/GalleryGrid";
import DummyImg from "@/assets/evento.jpeg";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function EventPage() {

    const [event, setEvent] = useState<any>();
    const router = useRouter();
    const params = useParams();
    const id = params.id;

    const get_eventById = async (id: any) => {
        const res = await fetch(`api/event/${id}`, { method: 'GET' });
        const event = await res.json();
        return event;
    }

    const delete_eventById = async (id: any) => {
        console.log('deleting id: ',id);
        const res = await fetch(`api/event/${id}`, {
            method: "DELETE"
        }
    );
        if (res.ok) router.back(); // go back to home
        else alert('error in deleting event!');
    }


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

            {/* ADMIN ONLY FEATURE ! */}

            <button className="fixed top-4 right-6 bg-red-500 text-white capitalize text-sm font-semibold rounded-full p-2 px-3 border border-gray-700 ">
                <Link href={`/edit-event/${event ? event._id : false}`}>
                    edit event !
                    <br />
                    <span className="d-block font-light text-xs">{ `(admin only!)` }</span>
                </Link>
            </button>
            <button className="fixed top-4 left-6 bg-red-500 text-white capitalize text-sm font-semibold rounded-full p-2 px-3 border border-gray-700 ">
                <span onClick={ () => delete_eventById(event._id) }>
                    delete event !
                    <br />
                    <span className="d-block font-light text-xs">{ `(admin only!)` }</span>
                </span>
            </button>

            {/* END */}

            <div className="flex items-center justify-between p-3 fixed bottom-0 right-0 left-0 bg-slate-300 text-black">
                <h2 className="font-bold">Total price</h2>
                <span className="font-bold ">{ event ? event.ticketprice : 'free '} $</span>
            </div>
        </main>
    );
}