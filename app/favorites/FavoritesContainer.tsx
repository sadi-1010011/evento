"use client";

import {  useEffect, useState } from "react";
import { IEvent } from "@/models/event";
import FavoritesCard from "@/components/favoritescard/FavoritesCard";

export default function FavoritesContainer({ favorites }: { favorites: []}) {

    const [events, setEvents] = useState<any>([]);
    const [isoffline, setOffline] = useState(false);

    useEffect(() => {
        if (favorites.length) setEvents(favorites);
        else setOffline(true);
    }, [favorites]);
    
    return (
        <div className="w-full h-auto">
            {
                isoffline ?
                    <h1 className="my-40 w-full text-center text-lg text-slate-400 capitalize font-bold">No events found!</h1>
                    :
                events.map((event: IEvent, i: number) => <FavoritesCard key={i} data={event} />)
            }
        </div>

    )
}