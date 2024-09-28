"use client"

import DummyIcon from "@/assets/profile/mishal.jpeg";
import RatingIcon from "@/assets/icons/star.png";
import HostIcon from "@/assets/icons/host_dark.png";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { userLogout } from "@/app/serverActions/userLogout";

export default function ProfileCard({ name, email }: { name: string, email: string }) {

    const router = useRouter()

    return (
        <>
        <div className="flex items-center justify-around w-4/5 sm:w-4/5 md:w-4/5 lg:w-2/3 xl:w-2/3 px-2 py-6 bg-white text-black rounded-3xl shadow-md">
            
            {/* PROFILE PIC, NAME */}
            <div className="flex flex-col items-center w-2/3">
                <Image priority className="w-3/5 h-auto aspect-square border-gray-300 border p-1.5 rounded-full" src={DummyIcon} alt="profile pic" />
                <h1 className="text-2xl font-bold capitalize text-center pt-2">{ name || 'name'}</h1>
                <div className="inline-flex items-center gap-x-0.5">
                    <Image src={HostIcon} width={22} height={22} className="inline p-0.5" alt="host icon" />
                    <span className="text-sm font-semibold capitalize text-center">{ email || 'superhost' }</span>
                </div>
            </div>

            {/* INFO */}
            <div className="flex flex-col w-1/3 text-left items-left justify-evenly">
                <div>
                    <h1 className="text-xl font-bold capitalize pt-2">163</h1>
                    <span className="text-sm font-semibold capitalize">reviews</span>
                </div>
                <div className="inline-flex flex-col items-start">
                    <h1 className="inline-flex items-center justify-center gap-x-1 text-xl font-bold capitalize pt-2">
                        4.92
                        <Image src={RatingIcon} width={12} height={12} alt="rating icon" />
                    </h1>
                    <span className="text-sm font-semibold capitalize">rating</span>
                </div>
                <div>
                    <h1 className="text-xl font-bold capitalize pt-2">11</h1>
                    <span className="text-sm font-semibold capitalize">years</span>
                </div>
            </div>


        </div>

        </>
    );
}