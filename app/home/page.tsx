"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

// components
import Catogories from "@/components/catogories/Catogories";
import EventCard from "@/app/home/EventCard";
import SearchBar from "@/components/searchbar/SearchBar";
// import Loading from "@/app/(Loading)/Loading";
// API
import { get_allEvents } from "../(fetchAPI)/restAPI";

// EVENT POSTERS
// import e1 from "@/assets/eventposters/event2.png";
// import e2 from "@/assets/eventposters/event3.jpg";
// import e3 from "@/assets/eventposters/event4.jpg";
// import e4 from "@/assets/eventposters/event5.jpg";
// import e5 from "@/assets/eventposters/event6.jpg";
// import e6 from "@/assets/eventposters/event7.jpg";


export default function HomePage() {

    const [events, setEvents] = useState([]);

    useEffect(()=> {
        // get events data
        get_allEvents().then((events) => {
            if (events.length)
                setEvents(events);
        });
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center pt-5 px-5">
            {/* <h1 className="inline-block text-left my-2 font-bold text-xl pl-2">Evento</h1> */}
            <SearchBar />
            <Catogories />
            <div className="w-full bg-black min-h-screen overflow-auto mt-3 px-4">
                
                {
                    events.length ?
                    events.map((event,i) => <EventCard key={i} data={event} />)
                        :
                    <div className="my-6">
                    <SkeletonTheme baseColor="#202020" highlightColor="#444">
                        <Skeleton height={120} className="my-2 rounded-md" count={1} />
                        <Skeleton height={20} className="w-1/2" count={1} />
                        <Skeleton height={50} width={50} className="m-2" borderRadius="50%" count={1} />
                        <Skeleton height={25} className="w-1/3" count={1} />
                        <Skeleton height={25} className="" count={1} />
                    </SkeletonTheme>
                    </div>
                }

                {/* ADMIN ONLY FEATURE! */}

                <Link href="/create-event" className="flex m-4 p-2 items-center justify-center rounded-md border-2 border-slate-800 hover:bg-slate-400 hover:text-black">
                    <h2 className="capitalize font-bold">add event</h2>
                    <span className="rounded-50 p-2 font-semibold text-xl capitalize">+</span>
                    <span className="d-block font-light text-xs">{ `(admin only!)` }</span>
                </Link>

                {/* END */}

            </div>
        </main>
    )
}