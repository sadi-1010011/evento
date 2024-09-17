"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

// components
import BottomNavBar from "@/components/bottomnavbar/BottomNavBar";
import EventCard from "@/app/events/EventCard";
// import Loading from "@/app/(Loading)/Loading";
// API
import { get_allEvents } from "../(fetchAPI)/restAPI";


export default function HomePage() {

    const [events, setEvents] = useState([]);
    const [isoffline, setOffline] = useState(false);

    useEffect(()=> {
        // get events data
        get_allEvents().then((events) => {
            if (events.length)
                setEvents(events);
            // else setOffline(true);
        });
    }, []);


    return (
        <main className="flex min-h-screen flex-col items-center px-3 pt-2 pb-16">
            <h1 className="inline-block text-left w-full mt-2 font-bold text-2xl pl-2">Evento</h1>
            {/* <SearchBar /> */}
            <BottomNavBar />
            <div className="w-full bg-white min-h-screen overflow-auto mt-0 px-2">
                                
                {
                    isoffline ? 
                        <h1 className="my-40 w-full text-center text-lg text-slate-400 capitalize font-bold">Development Mode !</h1>
                        :
                    events.length ?

                        events.map((event,i) => <EventCard key={i} data={event} />)
                            :
                        <div className="my-8 mx-4">
                        <SkeletonTheme baseColor="#808080" highlightColor="#888">
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