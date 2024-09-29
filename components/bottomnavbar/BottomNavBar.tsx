"use client"

import DummyIcon from "@/assets/evento.jpeg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
// icons 
import FavIcon from "@/assets/icons/heart-black.png"
import CatogoryIcon from "@/assets/icons/categories.png"
import ProfileIcon from "@/assets/icons/profile.png"



export default function BottomNavBar({ active = 'Explore'}) {

    const [activeTab, setActiveTab] = useState(active);
    const router = useRouter();

    // console.log(activeTab);
    
    // const navigariontabs = ['explore', 'catogory', 'favorites', 'profile'];

    function changeActiveTab(item: string) {
        setActiveTab(item);
        
        if (item === 'Catogory')
            router.push('/catogory');
        if (item === 'Explore')
            router.push('/events');
        if (item === 'Favorites')
            router.push('/favorites');
        if (item === 'Profile')
            router.push('/profile');
    }

    return (
        <div className="flex fixed bottom-0 left-0 right-0 bg-evento-white text-black dark:bg-slate-300 rounded-md z-30 w-full flex-row items-center justify-evenly ">

            <div onClick={ () => changeActiveTab('Explore') } className={`flex w-full rounded-md flex-col items-center pb-1 pt-2 transition-all dark:bg-white dark:text-black ${ activeTab  === 'Explore' ? 'font-bold' : 'font-normal text-zinc-500' }`}>
                <Image className="rounded-full" src={DummyIcon} width={22} height={22} alt="tab icon" />
                <span className={`text-xs capitalize my-1 ${ activeTab === 'Explore' ? 'font-bold' : 'font-normal' }`}>Explore</span>
            </div>

            <div onClick={ () => changeActiveTab('Favorites') } className={`flex w-full rounded-md flex-col items-center pb-1 pt-2 transition-all dark:bg-white dark:text-black ${ activeTab === 'Favorites' ? 'font-bold' : 'font-normal text-zinc-500' }`}>
                <Image className="rounded-full" src={FavIcon} width={22} height={22} alt="tab icon" />
                <span className={`text-xs capitalize my-1 ${ activeTab === 'Favorites' ? 'font-bold' : 'font-normal' }`}>Favorites</span>
            </div>

            <div onClick={ () => changeActiveTab('Catogory') } className={`flex w-full rounded-md flex-col items-center pb-1 pt-2 transition-all dark:bg-white dark:text-black ${ activeTab === 'Catogory' ? 'font-bold' : 'font-normal text-zinc-500' }`}>
                <Image className="rounded-full" src={CatogoryIcon} width={22} height={22} alt="tab icon" />
                <span className={`text-xs capitalize my-1 ${ activeTab === 'Catogory' ? 'font-bold' : 'font-normal' }`}>Catogory</span>
            </div>

            <div onClick={ () => changeActiveTab('Profile') } className={`flex w-full rounded-md flex-col items-center pb-1 pt-2 transition-all dark:bg-white dark:text-black ${ activeTab === 'Profile' ? 'font-bold' : 'font-normal text-zinc-500' }`}>
                <Image className="rounded-full" src={ProfileIcon} width={22} height={22} alt="tab icon" />
                <span className={`text-xs capitalize my-1 ${ activeTab === 'Profile' ? 'font-bold' : 'font-normal' }`}>Profile</span>
            </div>

        </div>
    );
}