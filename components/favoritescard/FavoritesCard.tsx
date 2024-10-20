"use client"

import Image from "next/image";
// import RatingIcon from "@/assets/icons/star.png";
import DummyImage from "@/assets/eventoLogo.jpeg";
import LocationIcon from "@/assets/icons/location-pin.png";
// import ShareIcon from "@/assets/icons/share-black.png";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
// image carousel
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import dateLabel from "@/utils/dateLabel";
import { IEvent } from "@/models/event";
import { FavoritedBtn, RemindMeBtn } from "../animatedbtns/AnimatedBtns";
import { deleteFavoritesAction } from "@/app/serverActions/user/deleteFavoritesAction";
import { getRandomInterval } from "@/utils/getRandomInterval";
import { dateShort } from "@/utils/dateLabel";


export default function FavoritesCard({ data } :{ data: IEvent }) {

    const router = useRouter();
    const [favorite, setFavorite] = useState<boolean>(true); // default favorited
    
    useEffect(() => {
        // Perform cleanup to remove from favorites list of user in server!
        if (favorite) return
        else {
            const userId = localStorage.getItem('user');
            const favoritedId = `${data._id}`;
            if (userId) {
                // SERVER ACTION
                deleteFavoritesAction(userId, favoritedId).then(res => {
                    console.log(res);
                    router.refresh();
                    // CUSTOM MODAL ALERT BOX HERE.. 
                })
            } else {
                // CUSTOM MODAL ALERT BOX HERE..
                router.replace('/login');
                console.log('Oops you were logged out!');
            }
        }
    }, [favorite]);

    return (
        <>
        {
        favorite && <div className="flex z-0 mb-10 w-full flex-col rounded-xl bg-evento-white text-black dark:bg-evento-black dark:text-white relative">
            <span className="absolute z-50 right-0 m-0.5 inline-flex flex-col gap-5" >
                <FavoritedBtn checked={true} onclick={() => setFavorite(false) } />
                <RemindMeBtn />
                {/* <Image src={ShareIcon} width={18} height={18} alt="share icon" /> */}
            </span>
            <div className="absolute font-medium z-50 border bg-evento-white text-black dark:bg-evento-black dark:text-white text-xs px-2 py-1 shadow-md m-2 rounded-md" >
                { data.date ? dateShort(data.date) : data.date || 'evnt date' }
            </div>
            
            {/* LINKS TO EVENT PAGE BY ID */}

                <div onClick={ (event) => { event.preventDefault(); router.push(`events/${data._id}`) }} className="w-full" >

                    {/* IMG CAROUSEL */}

                    <Carousel preventMovementUntilSwipeScrollTolerance swipeScrollTolerance={20} showThumbs={false} autoPlay={true} infiniteLoop swipeable={true} stopOnHover interval={getRandomInterval(7000, 2500)} showArrows={false} showStatus={false}>
                        <Image className="rounded-xl aspect-square w-full h-auto" src={ data.thumbnail || DummyImage} width={500} height={500} placeholder="empty" alt="event picture" />
                        <Image className="rounded-xl aspect-square w-full h-auto" src={ DummyImage} width={500} height={500} placeholder="empty" alt="event picture" />
                    </Carousel>

                    <div className="flex flex-row justify-between items-center pr-2 mt-2">
                        <h2 className="font-medium text-md capitalize">{ `${data.title}`}</h2>
                        {/* <span className="flex items-center justify-center gap-1 text-sm font-semibold capitalize">
                            <Image src={RatingIcon} width={13} height={13} alt="rating icon" />
                            4.9
                        </span> */}
                    </div>
                    <div className="flex items-center -mt-0.5 pr-2 text-sm text-gray-600">
                        <span>Hosted By </span><h3 className="capitalize">{data.hostname || 'host name'}</h3>
                    </div>
                    <Image className="inline pr-1 text-sm" src={LocationIcon} width={24} height={24} alt="location icon" />
                    <p className="inline pr-2">{data.location || 'event description'}</p>
                </div>
            </div>
        }
        </>
    );
}

                    