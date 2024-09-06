"use client"

import DummyIcons from "@/assets/evento.jpeg";
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
            alert('favorites under construction')
            // router.push('/favorites');
        if (item === 'Profile')
            router.push('/profile/1');
    }

    return (
        <div className="flex fixed bottom-0 left-0 right-0 bg-white rounded-md z-30 text-black w-full flex-row items-center justify-evenly">

                    <div onClick={ () => changeActiveTab('Explore') } onMouseOver={ (event)=> { event.currentTarget.style.backgroundColor = 'wheat' }} onMouseLeave={ (event)=> { event.currentTarget.style.backgroundColor = 'white' }} className={`flex w-full rounded-md flex-col items-center pb-1 pt-2 transition-all ${ activeTab === 'Explore' ? 'font-bold' : 'font-normal' }`}>
                        <Image className="rounded-full" src={DummyIcons} width={30} height={30} alt="tab icon" />
                        <span className={`text-xs capitalize my-1 ${ activeTab === 'Explore' ? 'font-bold' : 'font-normal' }`}>Explore</span>
                    </div>

                    <div onClick={ () => changeActiveTab('Favorites') } onMouseOver={ (event)=> { event.currentTarget.style.backgroundColor = 'wheat' }} onMouseLeave={ (event)=> { event.currentTarget.style.backgroundColor = 'white' }} className={`flex w-full rounded-md flex-col items-center pb-1 pt-2 transition-all ${ activeTab === 'Favorites' ? 'font-bold' : 'font-normal' }`}>
                        <Image className="rounded-full" src={FavIcon} width={30} height={30} alt="tab icon" />
                        <span className={`text-xs capitalize my-1 ${ activeTab === 'Favorites' ? 'font-bold' : 'font-normal' }`}>Favorites</span>
                    </div>

                    <div onClick={ () => changeActiveTab('Catogory') } onMouseOver={ (event)=> { event.currentTarget.style.backgroundColor = 'wheat' }} onMouseLeave={ (event)=> { event.currentTarget.style.backgroundColor = 'white' }} className={`flex w-full rounded-md flex-col items-center pb-1 pt-2 transition-all ${ activeTab === 'Catogory' ? 'font-bold' : 'font-normal' }`}>
                        <Image className="rounded-full" src={CatogoryIcon} width={30} height={30} alt="tab icon" />
                        <span className={`text-xs capitalize my-1 ${ activeTab === 'Catogory' ? 'font-bold' : 'font-normal' }`}>Catogory</span>
                    </div>

                    <div onClick={ () => changeActiveTab('Profile') } onMouseOver={ (event)=> { event.currentTarget.style.backgroundColor = 'wheat' }} onMouseLeave={ (event)=> { event.currentTarget.style.backgroundColor = 'white' }} className={`flex w-full rounded-md flex-col items-center pb-1 pt-2 transition-all ${ activeTab === 'Profile' ? 'font-bold' : 'font-normal' }`}>
                        <Image className="rounded-full" src={ProfileIcon} width={30} height={30} alt="tab icon" />
                        <span className={`text-xs capitalize my-1 ${ activeTab === 'Profile' ? 'font-bold' : 'font-normal' }`}>Profile</span>
                    </div>


        </div>
    );
}