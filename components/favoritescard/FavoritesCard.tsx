"use client"

import Image from "next/image";
// import RatingIcon from "@/assets/icons/star.png";
import DummyImage from "@/assets/eventoLogo.jpeg";
import LocationIcon from "@/assets/icons/location-pin.png";
// import ShareIcon from "@/assets/icons/share-black.png";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// image carousel
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import dateLabel from "@/utils/dateLabel";
import { IEvent } from "@/models/event";
import { FavoritedBtn, RemindMeBtn } from "../animatedbtns/AnimatedBtns";


export default function EventCard({ data, checked } :{ data: IEvent, checked: boolean }) {


    const router = useRouter();
    const [favorite, setFavorite] = useState(checked);
    const [eventdata, setEventData] = useState(data);

    return (
        <div className="flex z-0 mb-10 w-full flex-col rounded-xl bg-evento-white text-black dark:bg-evento-black dark:text-white relative overflow-hidden">
            <span className="absolute z-50 right-0 my-1 mx-1.5 p-1 inline-flex flex-col gap-5" >
                <FavoritedBtn checked onclick={()=> console.log('favorited!')} />
                <RemindMeBtn />
                {/* <Image src={ShareIcon} width={18} height={18} alt="share icon" /> */}
            </span>
            <div className="absolute font-medium z-50 border bg-evento-white text-black dark:bg-evento-black dark:text-white text-sm px-3 py-1 shadow-md m-3 rounded-md" >
                { eventdata.date || 'evnt date' }
            </div>
            
            {/* LINKS TO EVENT PAGE BY ID */}

                <div onClick={ (event) => { event.preventDefault(); }} className="w-full" >

                    {/* IMG CAROUSEL */}

                    <Carousel preventMovementUntilSwipeScrollTolerance swipeScrollTolerance={20} showThumbs={false} autoPlay infiniteLoop swipeable={true} stopOnHover interval={3000} showArrows={false} showStatus={false}>
                        <Image className="rounded-xl aspect-square w-full h-auto" src={ eventdata.thumbnail || DummyImage} width={500} height={500} placeholder="empty" alt="event picture" />
                        <Image className="rounded-xl aspect-square w-full h-auto" src={ DummyImage} width={500} height={500} placeholder="empty" alt="event picture" />
                    </Carousel>

                    <div className="flex flex-row justify-between items-center pr-2 mt-2">
                        <h2 className="font-medium text-lg capitalize">{ `${eventdata.title}`}</h2>
                        {/* <span className="flex items-center justify-center gap-1 text-sm font-semibold capitalize">
                            <Image src={RatingIcon} width={13} height={13} alt="rating icon" />
                            4.9
                        </span> */}
                    </div>
                    <div className="flex items-center -mt-0.5 pr-2 text-gray-600">
                        <span>Hosted By&nbsp;</span><h3 className="capitalize">{eventdata.hostname || 'host name'}</h3>
                    </div>
                    <Image className="inline pr-1" src={LocationIcon} width={24} height={24} alt="location icon" />
                    <p className="inline pr-2">{eventdata.location || 'event description'}</p>
                </div>
            </div>
    );
}

                    