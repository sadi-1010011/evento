"use client"

import Image from "next/image";
import DummyImage from "@/assets/eventoLogo.jpeg";
import LocationIcon from "@/assets/icons/location-pin.png";
import FavIcon from "@/assets/icons/heart-black.png";
import { DateTime } from "luxon";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function EventCard({ data }: any) {

    const router = useRouter();
    const eventdate = DateTime.fromISO(data.date).toFormat('yyyy LLL dd'); //=> '2024 Aug 14';

    return (
        <div className="flex my-10 flex-col rounded-xl bg-white w-full text-black relative">
            
            <span className="absolute m-5 p-1 rounded-full" >
                <Image src={FavIcon} width={22} height={22} alt="favorite icon" />
            </span>
            <div className="absolute right-0 border text-white text-sm px-2.5 shadow-md m-5 rounded-xl" >
                { eventdate || 'event date'}
            </div>
            
            {/* LINKS TO EVENT PAGE BY ID */}
                {/* <div onClick={ (event) => { event.preventDefault(); router.push(`events/${data._id}`); router.refresh(); }} > */}
                <Link href={`events/${data._id}`}>
                    <Image className="rounded-xl aspect-square " src={DummyImage} alt="event picture" />
                    <div className="flex flex-row justify-between mt-3 px-2">
                        <h2 className=" font-bold text-xl capitalize">{ `${data.title}`}</h2>
                        {/* <span className="text-sm font-semibold capitalize">rating: 4.9</span> */}
                    </div>
                    <div className="flex items-center my-0.5 px-2">
                        <span>By&nbsp;</span><h3 className="capitalize">{data.hostname || 'host name'}</h3>
                    </div>
                    <Image className="inline pl-2" src={LocationIcon} width={24} height={24} alt="location icon" />
                    &nbsp;
                    <p className="inline pr-2 text-slate-600">{data.location || 'event description'}</p>
                    {/* <p className="px-2 text-slate-600">duration</p> */}
                    <button className="my-0.5 pb-2 capitalize font-extrabold text-center w-full text-green-900 font-sans">view more</button>
                    </Link>
                {/* </div> */}
            </div>
    );
}