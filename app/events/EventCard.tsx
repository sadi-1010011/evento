"use client"

import Image from "next/image";
import DummyImage from "@/assets/eventoLogo.jpeg";
import LocationIcon from "@/assets/icons/location-pin.png";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// image carousel
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import dateLabel from "@/utils/dateLabel";
import { IEvent } from "@/models/event";
import { FavoritedBtn } from "@/components/animatedbtns/AnimatedBtns";
import { addFavoritesAction } from "../serverActions/user/addFavoritesAction";
import { isEventFavoritedAction } from "../serverActions/user/isEventFavoritedAction";
import { deleteFavoritesAction } from "../serverActions/user/deleteFavoritesAction";


export default function EventCard({ data, handleFavCount } :{ data: IEvent, handleFavCount: Function }) {


    const router = useRouter();
    const [favorite, setFavorite] = useState(false);
    const [thumbnail, setThumbnail] = useState('');
    const [eventdate, setEventdate] = useState('');
    
    function handleFavorite(val: boolean) {
        const userId = localStorage.getItem('user');
        const eventId = String(data._id);
        if (userId && eventId) {
            // SERVER ACTION
            if (!favorite) addFavoritesAction(userId, eventId).then(res => {
                if (res) handleFavCount();
                // CUSTOM MODAL ALERT BOX HERE..
                setFavorite(true);
            })
            else deleteFavoritesAction(userId, eventId).then(res => {
                if (res) setFavorite(false)
            })
        }
            // LOGIN TO ADD FAV
        else {
            // CUSTOM MODAL ALERT BOX HERE..
            console.log('Login to add favorites!');
            router.replace('/login');
        }
    }

    // thumbnail, datelabel
    useEffect(() => {
        // insert data after render!
        setThumbnail(data.thumbnail);
        if (typeof data.date === 'string') setEventdate(dateLabel(data.date))
    }, [data]);

    // is user logged in
    useEffect(()=> {
        const userId = localStorage.getItem('user');
        const eventId = String(data._id);
        if (userId && eventId) isEventFavoritedAction(eventId, userId).then(res => {
            if (res) setFavorite(true);
        })
    }, [data])

    return (
        <div className="flex z-0 mb-10 w-full flex-col rounded-xl bg-evento-white text-black dark:bg-evento-black dark:text-white relative overflow-hidden">
            <span className="absolute z-50 right-0 m-0.5 rounded-full" >
                <FavoritedBtn checked={favorite} onclick={(val: boolean)=> handleFavorite(val) } />
                {/* <Image onClick={ ()=> { setFavorite(!favorite); alert('you need to Login to add favorites!') } } src={favorite ? FavedIcon : FavIcon} width={22} height={22} alt="favorite icon" /> */}
            </span>
            <div className="absolute font-medium z-50 border bg-evento-white text-black dark:bg-evento-black dark:text-white text-sm px-3 py-1 shadow-md m-3 rounded-md" >
                { eventdate || 'evnt date' }
            </div>
            
            {/* LINKS TO EVENT PAGE BY ID */}

                <div onClick={ (event) => { event.preventDefault(); router.push(`/events/${data._id}`); }} className="w-full" >

                    {/* IMG CAROUSEL */}

                    <Carousel preventMovementUntilSwipeScrollTolerance swipeScrollTolerance={20} showThumbs={false} autoPlay={false} infiniteLoop swipeable={true} stopOnHover showArrows={false} showStatus={false}>
                        <Image className="rounded-xl aspect-square w-full h-auto" src={thumbnail || DummyImage} width={500} height={500} placeholder="empty" alt="event picture" />
                        <Image className="rounded-xl aspect-square w-full h-auto" src={ DummyImage} width={500} height={500} placeholder="empty" alt="event picture" />
                        <Image className="rounded-xl aspect-square w-full h-auto" src={ DummyImage} width={500} height={500} placeholder="empty" alt="event picture" />
                    </Carousel>

                    <div className="flex flex-row justify-between items-center pr-2 mt-2">
                        <h2 className="font-medium text-lg capitalize">{ `${data.title}`}</h2>
                        {/* <span className="flex items-center justify-center gap-1 text-sm font-semibold capitalize">
                            <Image src={RatingIcon} width={13} height={13} alt="rating icon" />
                            4.9
                        </span> */}
                    </div>
                    <div className="flex items-center -mt-0.5 pr-2 text-gray-600 dark:text-gray-400">
                        <span>Hosted By&nbsp;</span><h3 className="capitalize">{data.hostname || 'host name'}</h3>
                    </div>
                    <Image className="inline pr-1" src={LocationIcon} width={24} height={24} alt="location icon" />
                    <p className="inline pr-2">{data.location || 'event description'}</p>
                </div>
            </div>
    );
}