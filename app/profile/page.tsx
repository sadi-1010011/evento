"use client"

import DummyIcon from "@/assets/profile/mishal.jpeg";
import SettingsIcon from "@/assets/icons/settings.png"
import Image from "next/image";
import BottomNavBar from "@/components/bottomnavbar/BottomNavBar";
// SIGN IN
import { signIn } from "next-auth/react";

export default function ProfilePage() {

    return (
        <div className="flex z-0 items-center min-h-screen w-full overflow-x-hidden overflow-y-scroll flex-col bg-slate-200">
            
            {/* BLUE COMPONENT */}
            <div className="flex flex-col z-2 relative justify-center items-center pt-3 pb-10 bg-blue-900 rounded-b-3xl text-white text-center">
                <div className="flex w-full justify-between px-4">
                    <h2 className="text-center text-md capitalize">Profile Page</h2>
                    <Image width={22} height={22} src={SettingsIcon} alt="settings icon" />
                </div>
                <div className="w-1/2 m-auto pt-10 pb-6 h-auto">
                    <Image priority className="w-full h-auto border-yellow-300 border p-1.5 rounded-full" src={DummyIcon} alt="profile pic" />
                </div>
                <h1 className="m-0 font-bold ">Rocket Mishal</h1>
                <span className="text-xs text-gray-300">Level 10</span>
            
                {/* INFO COMPONENT */}
                <div style={{ "top": "calc(100% - 1.5rem)" }} className="flex flex-col items-center justify-center z-10 absolute rounded-2xl bg-white text-black p-2.5 w-4/5 m-auto  text-center">
                    <h2 className="font-semibold capitalize">some text</h2>
                    <span className="text-xs text-slate-700">user description here</span>
                    <div className="w-1/3 m-auto p-4 h-auto">
                        <span className="w-full h-auto border-yellow-300 border p-1.5 rounded-full">85</span>
                    </div>
                    <span className="text-xs text-slate-700 font-semibold">Streak</span>

                    {/* LOGIN/SIGNUP */}

                    <div className="flex items-center w-full mt-1.5 p-1 justify-around bg-slate-200 rounded-md hover:bg-black transition-all">
                        <button onClick={() => { signIn("github", { redirectTo: "/" }) } } className="rounded-md px-1 py-0.5 text-md font-semibold capitalize text-black hover:text-white">Login with GitHub</button>
                        {/* <button className="rounded-md px-1 py-0.5 text-md font-semibold capitalize text-red-800">Sign Up</button> */}
                    </div>
                </div>
            </div>

            <BottomNavBar active="Profile" />
        </div>
    );
}