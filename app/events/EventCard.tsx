"use client"

import Image from "next/image";
import DummyImage from "@/assets/eventoLogo.jpeg";
import LocationIcon from "@/assets/icons/location-pin.png";
import FavIcon from "@/assets/icons/heart-black.png";
import FavedIcon from "@/assets/icons/fav-red.png";
import RatingIcon from "@/assets/icons/star.png";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// image carousel
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import dateLabel from "@/utils/dateLabel";
import { IEvent } from "@/models/event";


export default function EventCard({ data } :{ data: IEvent }) {


    const router = useRouter();
    const [favorite, setFavorite] = useState(false);
    const [thumbnail, setThumbnail] = useState('');
    const [eventdate, setEventdate] = useState('');
    

    useEffect(() => {
        setThumbnail(data.thumbnail);
        if (typeof data.date === 'string') setEventdate(dateLabel(data.date))
    }, [data.thumbnail]);

    return (
        <div className="flex z-0 my-10 flex-col rounded-xl bg-white w-full text-black relative overflow-hidden">
            <span className="absolute z-50 right-0 m-5 p-1 rounded-full" >
                <Image onClick={ ()=> { setFavorite(!favorite); alert('you need to Login to add favorites!') } } src={favorite ? FavedIcon : FavIcon} width={22} height={22} alt="favorite icon" />
            </span>
            <div className="absolute z-50 border text-black bg-white text-sm px-2.5 shadow-md m-5 rounded-xl" >
                { eventdate || 'evnt date' }
            </div>
            
            {/* LINKS TO EVENT PAGE BY ID */}

                <div onClick={ (event) => { event.preventDefault(); router.push(`events/${data._id}`); }} className="w-full" >

                    {/* IMG CAROUSEL */}

                    <Carousel autoPlay infiniteLoop swipeable={false} stopOnHover interval={2400} showArrows={false} showStatus={false}>
                        <Image className="rounded-xl aspect-square w-full h-auto" src={thumbnail || DummyImage} width={500} height={500} placeholder="empty" alt="event picture" />
                        <Image className="rounded-xl aspect-square w-full h-auto" src={ DummyImage} width={500} height={500} placeholder="empty" alt="event picture" />
                    </Carousel>

                    <div className="flex flex-row justify-between items-center px-2 -mt-6">
                        <h2 className="font-bold text-xl capitalize">{ `${data.title}`}</h2>
                        <span className="flex items-center justify-center gap-1 text-sm font-semibold capitalize">
                            <Image src={RatingIcon} width={13} height={13} alt="rating icon" />
                            4.9
                        </span>
                    </div>
                    <div className="flex items-center my-0.5 px-2">
                        <span>By&nbsp;</span><h3 className="capitalize">{data.hostname || 'host name'}</h3>
                    </div>
                    <Image className="inline pl-2" src={LocationIcon} width={24} height={24} alt="location icon" />
                    &nbsp;
                    <p className="inline pr-2 text-slate-600">{data.location || 'event description'}</p>
                    {/* <p className="px-2 text-slate-600">duration</p> */}
                    <button className="my-0.5 pb-2 capitalize font-extrabold text-center w-full text-green-900 font-sans">view more</button>
                </div>
            </div>
    );
}