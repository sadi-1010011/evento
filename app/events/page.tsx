"use client"

import { Suspense, useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

// components
import BottomNavBar from "@/components/bottomnavbar/BottomNavBar";
import EventCard from "@/app/events/EventCard";
// import Loading from "@/app/(Loading)/Loading";
// API
import { get_allEvents, get_eventsByCatogory } from "../(fetchAPI)/restAPI";
import { useRouter, useSearchParams } from "next/navigation";
import EventTabs from "@/components/eventtabs/EventTabs";


export default function HomePage() {


    const [events, setEvents] = useState([]);
    const [isoffline, setOffline] = useState(false);
    // const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(()=> {
        // get catogory
        // const catogory = searchParams.get('catogory')

        // if(catogory && catogory !== 'all') {
        //     get_eventsByCatogory(catogory).then((events) => {
        //         if (events.length) setEvents(events);
        //         else setOffline(true);
        //     });
        // }

            // else get all events data
            get_allEvents().then((events) => {
                if (events.length)
                    setEvents(events);
                // OFFLINE MODE!
                else setOffline(true);
            });
    }, []);


    return (
        <main className="flex min-h-screen flex-col items-center px-3 pt-2 pb-16 bg-evento-white text-black dark:bg-black dark:text-white">
            <div className="inline-flex flex-row w-full px-2 pt-2 items-center justify-between">
                <h1 className="inline-block text-left w-full mt-1 font-bold text-2xl pl-2">Evento</h1>
            </div>
            
            <EventTabs active={2} />

            <div className="w-full min-h-screen overflow-auto mt-0 px-2">
                                
                {
                    isoffline ? 
                        <h1 className="my-40 w-full text-center text-lg text-slate-400 capitalize font-bold">No events found!</h1>
                        :
                    events.length ?

                        events.map((event,i) => <Suspense key={i}>
                            <EventCard data={event} />
                            <hr style={{ width: '90%', display: 'block', margin: '1.4rem auto'}} />
                        </Suspense>)
                            :
                        <div className="my-8 mx-4">
                        <SkeletonTheme baseColor="#909090" highlightColor="#888">
                            <Skeleton height={130} className="my-2 rounded-md" count={1} />
                            <Skeleton height={20} className="w-1/2" count={1} />
                            <Skeleton height={50} width={50} className="m-2" borderRadius="50%" count={1} />
                            <Skeleton height={25} className="w-1/3" count={1} />
                            <Skeleton height={25} className="" count={1} />
                        </SkeletonTheme>
                        </div>
                }

                {/* ADMIN ONLY FEATURE! */}

                <div onClick={ () => router.push("/create-event") } className="flex m-4 p-2 items-center justify-center rounded-md border-2 border-slate-500 hover:bg-evento-black hover:text-white transition-all">
                    <h2 className="capitalize font-bold">add event</h2>
                    <span className="rounded-50 p-2 font-semibold text-xl capitalize">+</span>
                    <span className="d-block font-light text-xs">{ `(admin only!)` }</span>
                </div>

                {/* END */}

                <BottomNavBar />

            </div>
        </main>
    )
}