"use client";

import {  useEffect, useState } from "react";
import { IEvent } from "@/models/event";
import FavoritesCard from "@/components/favoritescard/FavoritesCard";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function FavoritesContainer({ favorites }: { favorites: []}) {

    const [events, setEvents] = useState<any>([]);
    const [isoffline, setOffline] = useState(false);

    useEffect(() => {
        if (favorites.length) setEvents(favorites);
        else setOffline(true);
    }, [favorites]);
    
    return (
        <div className="w-full grid grid-cols-2 gap-x-2 h-auto">
            {
                isoffline ?
                    <h1 className="my-40 w-full text-center text-lg text-slate-400 capitalize font-bold">No events found!</h1>
                    :
                    !events.length ?
                    
                        // LOADING SKELETON
                        <div className="my-8 mx-4 w-full">
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