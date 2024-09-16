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
            router.push('/home');
        if (item === 'Favorites')
            router.push('/favorites');
        if (item === 'Profile') {
            router.push('/profile');
            router.refresh();
        }
    }

    return (
        <div style={{ boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px" }} className="flex fixed bottom-0 left-0 right-0 bg-white rounded-md z-30 text-black w-full flex-row items-center justify-evenly">

                    <div onClick={ () => changeActiveTab('Explore') } className={`flex w-full rounded-md flex-col items-center pb-1 pt-2 transition-all hover:bg-slate-400 hover:text-white ${ activeTab  === 'Explore' ? 'font-bold bg-slate-300' : 'font-normal' }`}>
                        <Image className="rounded-full" src={DummyIcon} width={22} height={22} alt="tab icon" />
                        <span className={`text-xs capitalize my-1 ${ activeTab === 'Explore' ? 'font-bold' : 'font-normal' }`}>Explore</span>
                    </div>

                    <div onClick={ () => changeActiveTab('Favorites') } className={`flex w-full rounded-md flex-col items-center pb-1 pt-2 transition-all hover:bg-slate-400 hover:text-white ${ activeTab === 'Favorites' ? 'font-bold bg-slate-300' : 'font-normal' }`}>
                        <Image className="rounded-full" src={FavIcon} width={22} height={22} alt="tab icon" />
                        <span className={`text-xs capitalize my-1 ${ activeTab === 'Favorites' ? 'font-bold' : 'font-normal' }`}>Favorites</span>
                    </div>

                    <div onClick={ () => changeActiveTab('Catogory') } className={`flex w-full rounded-md flex-col items-center pb-1 pt-2 transition-all hover:bg-slate-400 hover:text-white ${ activeTab === 'Catogory' ? 'font-bold bg-slate-300' : 'font-normal' }`}>
                        <Image className="rounded-full" src={CatogoryIcon} width={22} height={22} alt="tab icon" />
                        <span className={`text-xs capitalize my-1 ${ activeTab === 'Catogory' ? 'font-bold' : 'font-normal' }`}>Catogory</span>
                    </div>

                    <div onClick={ () => changeActiveTab('Profile') } className={`flex w-full rounded-md flex-col items-center pb-1 pt-2 transition-all hover:bg-slate-400 hover:text-white ${ activeTab === 'Profile' ? 'font-bold bg-slate-300' : 'font-normal' }`}>
                        <Image className="rounded-full" src={ProfileIcon} width={22} height={22} alt="tab icon" />
                        <span className={`text-xs capitalize my-1 ${ activeTab === 'Profile' ? 'font-bold' : 'font-normal' }`}>Profile</span>
                    </div>


        </div>
    );
}