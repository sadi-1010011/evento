"use client"

export const dynamicParams = true // dynamic params ON!

import { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

// components
import BottomNavBar from "@/components/bottomnavbar/BottomNavBar";
import EventCard from "@/app/events/EventCard";
// import Loading from "@/app/(Loading)/Loading";
// API
import { get_allEvents } from "../(fetchAPI)/restAPI";
import { useRouter, useSearchParams } from "next/navigation";
import EventTabs from "@/components/eventtabs/EventTabs";
import { DateTime } from "luxon";
import { getEventsByDateAction } from "../serverActions/events/getEventsByDateAction";
import { getEventsByDateUpcomingAction } from "../serverActions/events/getEventsByDateUpcomingAction";
import { getEventsByCatogory } from "../serverActions/events/getEventsByCatogory";


export default function HomePage() {

    const [events, setEvents] = useState([]);
    const [activeEventTab, setActiveEventTab] = useState(2); // 1=today, 2=upcoming; default 2
    const [isoffline, setOffline] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false); // admin features!
    const searchParams = useSearchParams();
    const catogory = searchParams.get('catogory')
    const router = useRouter();

    // CATOGORY EVENTS
    useEffect(() => {
        if (catogory && catogory !== 'all')
            // SERVER ACTION
            getEventsByCatogory(catogory).then(result => {
                setEvents(result);
            }).catch((error: any) => {
                console.log('error in sorting events by catogory!',error);
            });
        else
            // API CALL
            get_allEvents().then((events) => {
                if (events.length)
                    setEvents(events);
                    // OFFLINE MODE!
                else setOffline(true);
            });
      }, [catogory])

    // TODAY-UPCOMING EVENTS
    useEffect(() => {
        let todayDate = DateTime.local().toISO().split('T')[0]; // current date
        if (activeEventTab === 1 && events.length) { // today events only
            // SERVER ACTION
            getEventsByDateAction(todayDate).then(result => {
                setEvents(result);
            }).catch((error: any) => {
                console.log('error in sorting todays events!',error);
            });
        }
        if (activeEventTab === 2 && events.length) { // upcoming events only
            // SERVER ACTION
            getEventsByDateUpcomingAction(todayDate).then(result => {
                setEvents(result);
            }).catch((error: any) => {
                console.log('error in sorting todays events!',error);
            })
        }
    }, [activeEventTab]);

    // ISADMIN USER?
    useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin'); // value is admin name or username!
        if (isAdmin) setIsAdmin(true);
    }, []);

    // change TODAY-UPCOMING tabs
    function handle_activeTabs (active: number) {
        setActiveEventTab(active);
    }

    return (
        <main className="flex min-h-screen flex-col items-center px-3 pt-2 pb-16 bg-evento-white text-black dark:bg-evento-black dark:text-white">
            <div className="inline-flex flex-row w-full px-2 pt-2 items-center justify-between">
                <h1 className="inline-block text-left w-full mt-1 font-bold text-2xl pl-2">Evento</h1>
            </div>
            
            <EventTabs active={activeEventTab} clickhandler={ handle_activeTabs } />

            <div className="w-full min-h-screen overflow-auto mt-0 px-2">
                                
                {
                    isoffline ? 
                        <h1 className="my-40 w-full text-center text-lg text-slate-400 capitalize font-bold">No events found!</h1>
                        :
                    events.length ?

                                events.map((event,i) => <EventCard key={i} data={event} />)

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

                { isAdmin && <div onClick={ () => router.push("/create-event") } className="flex m-4 p-2 items-center justify-center rounded-md border-2 border-slate-500 hover:bg-evento-black hover:text-white transition-all">
                    <h2 className="capitalize font-bold">add event</h2>
                    <span className="rounded-50 p-2 font-semibold text-xl capitalize">+</span>
                    <span className="d-block font-light text-xs">{ `(admin only!)` }</span>
                </div> }

                {/* END */}

                <BottomNavBar />

            </div>
        </main>
    )
}