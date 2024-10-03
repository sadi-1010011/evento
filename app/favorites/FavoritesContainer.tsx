"use client";

import { useEffect, useState } from "react";
import { get_eventById } from "../(fetchAPI)/restAPI";
import { IEvent } from "@/models/event";
import FavoritesCard from "@/components/favoritescard/FavoritesCard";

export default function FavoritesContainer({ favorites }: { favorites: []}) {

    const [events, setEvents] = useState<Array<IEvent>>([]);
    let fetchedEvents: any = [];
    
    function fetchFavorites(favorites: []) {
        if (favorites.length) {
            // fetch here
            favorites.map((favorite: string) => {
                if (typeof favorite === 'string') {
                    get_eventById(favorite).then(res =>{
                        if (res.title) fetchedEvents.push(res); // save in list
                    }).catch(error => {
                        console.log('error in fetching favorites!');
                        // err handling
                    });
                    return;
                }
            }); 
            if (fetchedEvents) {
                return (fetchedEvents);
            }
        }
    }

    useEffect(()=> {
        const favEvents = fetchFavorites(favorites)
        console.log('favs: ',favEvents)
        favEvents.length ? setEvents(favEvents) : false;
    }, []);

    console.log('events: ',events)
    
    return (
        <div className="w-full h-auto">
            <h2>{'events'}</h2>
            {
                // events.map((event: IEvent, i: number) => <h2 key={i}>favorites added! {event.title}</h2>)
                events.length && events.map((event: IEvent, i: number) => <FavoritesCard key={i} data={event} checked />)
            }
        </div>
    )
}