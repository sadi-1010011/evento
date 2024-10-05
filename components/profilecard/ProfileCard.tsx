"use client"

import DummyIcon from "@/assets/profile/mishal.jpeg";
import RatingIcon from "@/assets/icons/star.png";
import HostIcon from "@/assets/icons/host_dark.png";
// import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function ProfileCard({ id, name, email, joinedyear }: { id: string, name: string, email: string, joinedyear: number }) {

    const [userId, setUserId] = useState(id);
    // const router = useRouter()
    useEffect(() => {
        if (id !== undefined) localStorage.setItem('user', id);
    }, [userId]);

    return (
        <>
        <div className="flex items-center justify-around w-4/5 sm:w-4/5 md:w-4/5 lg:w-2/3 xl:w-2/3 px-2 py-6 bg-evento-white text-black rounded-3xl shadow-evento-shadow mt-2">

            {/* PROFILE PIC, NAME */}
            <div className="flex flex-col items-center w-2/3">
                <Image priority className="w-3/5 h-auto aspect-square border-gray-300 border p-1.5 rounded-full" src={DummyIcon} alt="profile pic" />
                <h1 className="text-2xl font-bold capitalize text-center pt-2 break-all">{ name || 'name'}</h1>
                <div className="inline-flex items-center gap-x-0.5">
                    <Image src={HostIcon} width={22} height={22} className="inline p-0.5" alt="host icon" />
                    <span className="text-sm font-semibold text-center">{ email || 'superhost' }</span>
                </div>
            </div>

            {/* INFO */}
            <div className="flex flex-col w-1/3 text-left items-left justify-evenly">
                <div>
                    <h1 className="text-xl font-bold capitalize pt-2">0</h1>
                    <span className="text-sm font-semibold capitalize text-slate-500">reviews</span>
                </div>
                <div className="inline-flex flex-col items-start">
                    <h1 className="inline-flex items-center justify-center gap-x-1 text-xl font-bold capitalize pt-2">
                        0
                        <Image src={RatingIcon} width={12} height={12} alt="rating icon" />
                    </h1>
                    <span className="text-sm font-semibold capitalize text-slate-500">rating</span>
                </div>
                <div>
                    <h1 className="text-xl font-bold capitalize pt-2">{ joinedyear || 0 }</h1>
                    <span className="text-sm font-semibold capitalize text-slate-500">joined</span>
                </div>
            </div>


        </div>

        </>
    );
}