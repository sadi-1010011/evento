"use client";

import { useEffect, useState } from "react";
import { get_eventById } from "../(fetchAPI)/restAPI";
import { IEvent } from "@/models/event";
import FavoritesCard from "@/components/favoritescard/FavoritesCard";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function FavoritesContainer({ favorites }: { favorites: []}) {

    const [events, setEvents] = useState<Array<IEvent>>([]);
    const [isoffline, setOffline] = useState(false);
    
    useEffect(() => {
        const fetchEvents = async () => {
            const events = await Promise.all(
                favorites.map((favorite: string) => get_eventById(favorite).then(res => res
                ))
            );
            // console.log('events: ',events);
            events.length ? setEvents(events) : setOffline(true);
        }; 
        // API calls start!
        fetchEvents();
    }, [favorites]);
    
    return (
        <div className="w-full h-auto">
            {
                isoffline ?
                    <h1 className="my-40 w-full text-center text-lg text-slate-400 capitalize font-bold">No events found!</h1>
                    :
                !events.length ?

                    <div className="my-8 mx-4">
                        <SkeletonTheme baseColor="#909090" highlightColor="#888">
                            <Skeleton height={130} className="my-2 rounded-md" count={1} />
                            <Skeleton height={20} className="w-1/2" count={1} />
                            <Skeleton height={50} width={50} className="m-2" borderRadius="50%" count={1} />
                            <Skeleton height={25} className="w-1/3" count={1} />
                            <Skeleton height={25} className="" count={1} />
                        </SkeletonTheme>
                    </div>
                        :
                    events.map((event: IEvent, i: number) => <FavoritesCard key={i} data={event} />)
            }
        </div>

    )
}