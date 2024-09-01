"use client"

import DummyIcons from "@/assets/evento.jpeg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BottomNavBar() {

    const [activeTab, setActiveTab] = useState('explore');
    const router = useRouter();
    
    // const navigariontabs = ['explore', 'catogory', 'favorites', 'profile'];

    function changeActiveTab(item: string) {
        setActiveTab(item);
        if (item === 'Catogory')
            router.push('/catogory')
    }

    return (
        <div className="flex fixed bottom-0 left-0 right-0 bg-white rounded-md z-30 text-black w-full flex-row items-center justify-evenly">

                    <div onClick={ () => changeActiveTab('Explore') } onMouseOver={ (event)=> { event.currentTarget.style.backgroundColor = 'wheat' }} onMouseLeave={ (event)=> { event.currentTarget.style.backgroundColor = 'white' }} className={`flex w-full rounded-md flex-col items-center pb-1 pt-2 transition-all ${ activeTab === 'Explore' ? 'font-bold' : 'font-normal' }`}>
                        <Image className="bg-white rounded-full" src={DummyIcons} width={30} height={30} alt="tab icon" />
                        <span className="text-xs font-semibold capitalize my-1">Explore</span>
                    </div>

                    <div onClick={ () => changeActiveTab('Favorites') } onMouseOver={ (event)=> { event.currentTarget.style.backgroundColor = 'wheat' }} onMouseLeave={ (event)=> { event.currentTarget.style.backgroundColor = 'white' }} className={`flex w-full rounded-md flex-col items-center pb-1 pt-2 transition-all ${ activeTab === 'Favorites' ? 'font-bold' : 'font-normal' }`}>
                        <Image className="bg-white rounded-full" src={DummyIcons} width={30} height={30} alt="tab icon" />
                        <span className="text-xs font-semibold capitalize my-1">Favorites</span>
                    </div>

                    <div onClick={ () => changeActiveTab('Catogory') } onMouseOver={ (event)=> { event.currentTarget.style.backgroundColor = 'wheat' }} onMouseLeave={ (event)=> { event.currentTarget.style.backgroundColor = 'white' }} className={`flex w-full rounded-md flex-col items-center pb-1 pt-2 transition-all ${ activeTab === 'Catogories' ? 'font-bold' : 'font-normal' }`}>
                        <Image className="bg-white rounded-full" src={DummyIcons} width={30} height={30} alt="tab icon" />
                        <span className="text-xs font-semibold capitalize my-1">Catogory</span>
                    </div>

                    <div onClick={ () => changeActiveTab('Profile') } onMouseOver={ (event)=> { event.currentTarget.style.backgroundColor = 'wheat' }} onMouseLeave={ (event)=> { event.currentTarget.style.backgroundColor = 'white' }} className={`flex w-full rounded-md flex-col items-center pb-1 pt-2 transition-all ${ activeTab === 'Profile' ? 'font-bold' : 'font-normal' }`}>
                        <Image className="bg-white rounded-full" src={DummyIcons} width={30} height={30} alt="tab icon" />
                        <span className="text-xs font-semibold capitalize my-1">Profile</span>
                    </div>


        </div>
    );
}