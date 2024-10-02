"use client";

import { useEffect, useState } from "react";
import { get_eventById } from "../(fetchAPI)/restAPI";
import EventCard from "@/components/favoritescard/FavoritesCard";

export default function FavoritesContainer({ favorites }: { favorites: []}) {

    const [events, setEvents] = useState<any>([]);
    let fetchedEvents: any = [];
    
    useEffect(()=> {
        if (favorites.length) {
            // fetch here
            favorites.map((favorite: string) => {
            if (typeof favorite === 'string') {
                get_eventById(favorite).then(res =>{
                    if (res) fetchedEvents.push(res); // save in events
                }).catch(error => {
                    console.log('error in fetching favorites!');
                    // err handling
                });
            }
            setEvents(fetchedEvents);
        });
            // if ok save in state
            // if (fetchedEvents.length) {
            //     console.log(fetchedEvents);
            // }
        }
    }, [favorites]);

    return (
        <div className="w-full h-auto">
            {
                events && events.map((event: any) => <EventCard key={event.id} data={event} checked />)
            }
        </div>
    )
}