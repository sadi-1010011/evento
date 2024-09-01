"use client"

import Image from "next/image";
import Link from "next/link";
import DummyImage from "@/assets/eventoLogo.jpeg";
import LocationIcon from "@/assets/icons/location-pin.png";

export default function EventCard({ data }: any) {

    return (
        <div className="flex my-10 flex-col rounded-xl bg-white w-full text-black">
            <div className="absolute bg-white text-sm font-semibold px-2.5 shadow-md m-5 rounded-xl" >{ data.date || 'event date'}</div>
            <span className="absolute right-8 bg-white text-sm font-semibold px-2.5 shadow-md m-5 rounded-xl" >o</span>
            
            {/* LINKS TO EVENT PAGE BY ID */}
                <Link href={`/event/${data._id ? data._id : '/event/'}`} >
                    <Image className="rounded-md aspect-square " src={ DummyImage} alt="event picture" />
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
            </div>
    );
}