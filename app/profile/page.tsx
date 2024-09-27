"use client"

import DummyIcon from "@/assets/profile/mishal.jpeg";
import RatingIcon from "@/assets/icons/star.png";
import HostIcon from "@/assets/icons/host_dark.png";
import Image from "next/image";
import BottomNavBar from "@/components/bottomnavbar/BottomNavBar";
// import SettingsIcon from "@/assets/icons/settings.png";
// SIGN IN
// import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {

    const router = useRouter()

    return (
        <div className="flex items-center min-h-screen w-full overflow-x-hidden flex-col pt-4 px-2">
            
            {/* PROFILE CARD */}
            <div className="flex items-center justify-around w-2/3 sm:w-2/3 md:w-2/3 px-2 py-6 bg-white text-black rounded-3xl shadow-md">
                
                {/* PROFILE PIC, NAME */}
                <div className="flex flex-col items-center w-2/3">
                    <Image priority className="w-3/5 h-auto aspect-square border-gray-300 border p-1.5 rounded-full" src={DummyIcon} alt="profile pic" />
                    <h1 className="text-2xl font-bold capitalize text-center pt-2">mishal</h1>
                    <div className="inline-flex items-center gap-x-0.5">
                        <Image src={HostIcon} width={22} height={22} className="inline p-0.5" alt="host icon" />
                        <span className="text-sm font-semibold capitalize text-center">superhost</span>
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

            {/* <h1 className="text-2xl font-bold capitalize text-center pt-2">login</h1> */}

            <div className="flex flex-col gap-1.5 w-1/2 pt-6">
                <button onClick={() => router.push("/register") } className="py-2 rounded-md border-2 bg-white hover:border-slate-700 hover:bg-slate-700 hover:text-white transition-all capitalize shadow-md">create account</button>
                <button onClick={() => router.push("/register") } className="py-2 rounded-md border-2 bg-white hover:border-slate-700 hover:bg-slate-700 hover:text-white transition-all capitalize shadow-md">login with Email</button>
            </div>

            
            <BottomNavBar active="Profile" />
        </div>
    );
}