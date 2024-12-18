"use client"

export const dynamicParams = true // dynamic params ON!

import PlutoLogoDark from "@/assets/logo/plutoblack.png"
import { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import ProfileIcon from "@/assets/icons/profile-blue.png";
import LoginIcon from "@/assets/icons/login.png";

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
import getProfileAction from "../serverActions/user/getProfileAction";
import Image from "next/image";
import { IncrementLikeCount } from "../serverActions/user/IncrementLikedCount";
import { decrementLikeCount } from "../serverActions/user/decrementLikeCount";


export default function HomePage() {

    const [events, setEvents] = useState([]);
    const [activeEventTab, setActiveEventTab] = useState(0); // 1=today, 2=upcoming; default 2
    const [favcount, setFavCount] = useState(0); // favorites count for bottom navbar
    const [isoffline, setOffline] = useState(false);
    const [login, setLogin] = useState(false);
    const [profileURL, setProfileURL] = useState('');
    const [isAdmin, setIsAdmin] = useState(false); // admin features!
    const searchParams = useSearchParams();
    const catogory = searchParams.get('catogory')
    const router = useRouter();

    // CATOGORY EVENTS
    useEffect(() => {
        if (catogory && catogory !== 'all')
            // SERVER ACTION
            getEventsByCatogory(catogory).then(result => {
                result.length ? setEvents(result) : setOffline(true)
            }).catch((error: any) => {
                console.log('error in sorting events by catogory!',error);
            });
        else
            // API CALL
            get_allEvents().then((events) => {
                console.log(events);
                if (events.length)
                    setEvents(events);
                    // OFFLINE MODE!
                else setOffline(true);
            });
      }, [])

    // TODAY-UPCOMING EVENTS
    useEffect(() => {
        setEvents([]); // empty events for loading skeleton!
        let todayDate = DateTime.local().toISO().split('T')[0]; // current date
        if (activeEventTab === 1) { // today events only
            console.log('today events')
            // SERVER ACTION
            getEventsByDateAction(todayDate).then(result => {
                console.log(result)
                if (result.data) setEvents(result.data)
                else setOffline(true);
            }).catch((error: any) => {
                console.log('error in sorting todays events!',error);
            });
        }

        if (activeEventTab === 2) { // upcoming events only
        console.log('upcoming events')
            // SERVER ACTION
            getEventsByDateUpcomingAction(todayDate).then(result => {
                if (result.data) setEvents(result.data)
                else setOffline(true);
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

    // AUTO SET - LOGIN, PROFILE, THEME
    useEffect(() => {
        // THEME
        const theme = localStorage.getItem('theme');
        if (theme === 'dark')
			document.documentElement.classList.add('dark');
        else 
            document.documentElement.classList.remove('dark');
        // LOGIN STATUS
        const loginstatus = localStorage.getItem('user');
        loginstatus ? setLogin(true) : setLogin(false);
        // PROFILE
        const profileurlkey = localStorage.getItem('userprofilekey');
        if (profileurlkey && loginstatus) getProfileAction(profileurlkey).then(res => {
          if (res) {
           setProfileURL(res);
          }
        else setProfileURL('');
        })
    }, []);

    // change TODAY-UPCOMING tabs
    function handle_activeTabs (active: number) {
        setActiveEventTab(active);
    }

    // likedevents in profile, dot in favorites tab!
    function handleFavCount(eventId: string, incrementOrDecrement: boolean) {
        const userId = localStorage.getItem('user');
        if (login && userId && eventId) {
            incrementOrDecrement ?
                IncrementLikeCount(userId, eventId).then(res => {
                    console.log(res);
                    setFavCount(1);
                })
            :
                decrementLikeCount(userId, eventId).then(res => {
                    console.log(res);
                    setFavCount(0)
                })
        }

        else return;
    }

    return (
        <main className="flex min-h-screen flex-col items-center px-3 pt-2 pb-16 bg-evento-white text-black dark:bg-evento-black dark:text-white">
            <div className="inline-flex w-full mt-1 px-2 pt-2 items-center justify-between">
                <Image src={PlutoLogoDark} width={100} height={30} className="inline-block font-extrabold pl-1" onClick={ ()=> router.replace('/')} alt="pluto" />
                {
                    login ?
                        <span className="overflow-hidden pr-1" onClick={ () => alert(`hi, welcome back!`)}>
                            <Image src={profileURL || ProfileIcon} width={25} height={25} className="rounded-full border border-evento-black" alt="user" />
                        </span>
                        :
                        <span className="overflow-hidden pr-1" onClick={ () => router.push('/login')}>
                            <Image src={LoginIcon} width={30} height={20} className="w-auto h-auto" alt="login" />
                        </span>

                }
            </div>
            
            <EventTabs active={activeEventTab} clickhandler={ handle_activeTabs } />

            <div className="w-full min-h-screen overflow-auto mt-0 px-3">
                                
                {
                    isoffline ? 
                        <h1 className="my-40 w-full text-center text-lg text-slate-400 capitalize font-bold">
                            No events found!
                            { catogory && <br />}
                            { catogory && <span onClick={ () => router.replace('/catogory') } className="capitalize underline underline-offset-auto font-extrabold cursor-pointer">{` in ${catogory}`}</span>}
                        </h1>
                        :
                    events.length ?

                                events.map((event,i) => <EventCard key={i} data={event} handleFavCount={handleFavCount} />)

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

                <BottomNavBar favcount={favcount} />

            </div>
        </main>
    )
}