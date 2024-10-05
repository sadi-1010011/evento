"use client"

// ICONS DARK & LIGHT Theme outlined
import HomeDarkIcon from "@/assets/icons/bottomnavbar/homeDark.png"
import HomeLightIcon from "@/assets/icons/bottomnavbar/homeLight.png"
import CatogoryDarkIcon from "@/assets/icons/bottomnavbar/categoryDark.png"
import CatogoryLightIcon from "@/assets/icons/bottomnavbar/categoryLight.png"
import FavoritesDarkIcon from "@/assets/icons/bottomnavbar/heartDark.png"
import FavoritesLIghtIcon from "@/assets/icons/bottomnavbar/heartLight.png"
import ProfileDarkIcon from "@/assets/icons/bottomnavbar/userDark.png"
import ProfileLightIcon from "@/assets/icons/bottomnavbar/userLight.png"

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



export default function BottomNavBar({ active = 'Explore'}) {

    const [activeTab, setActiveTab] = useState(active);
    const router = useRouter();

    const [darkTheme, setDarkTheme] = useState(false);

	useEffect(() => {
		const theme = localStorage.getItem('theme');
		if (theme === 'dark') {
			setDarkTheme(true);
		} else {
			setDarkTheme(false);
		}
	}, [active]);

    function changeActiveTab(item: string) {
        setActiveTab(item);
        // routing
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
        <div className="flex fixed bottom-0 left-0 right-0 bg-evento-white text-black dark:bg-evento-black dark:text-white rounded-md z-30 w-full flex-row items-center justify-evenly shadow-evento-shadow">

            <div onClick={ () => changeActiveTab('Explore') } className={`flex w-full rounded-md flex-col items-center pb-1 pt-2 hover:cursor-pointer transition-all ${ activeTab  === 'Explore' ? 'font-bold' : 'font-normal text-zinc-500' }`}>
                <Image src={ !darkTheme ? HomeDarkIcon : HomeLightIcon} width={22} height={22} alt="Home tab" />
                <span className={`text-xs capitalize my-1 ${ activeTab === 'Explore' ? 'font-bold' : 'font-normal' }`}>Explore</span>
            </div>

            <div onClick={ () => changeActiveTab('Favorites') } className={`flex w-full rounded-md flex-col items-center pb-1 pt-2 hover:cursor-pointer transition-all ${ activeTab === 'Favorites' ? 'font-bold' : 'font-normal text-zinc-500' }`}>
                <Image src={ !darkTheme ? FavoritesDarkIcon : FavoritesLIghtIcon} width={22} height={22} alt="Favorites tab" />
                <span className={`text-xs capitalize my-1 ${ activeTab === 'Favorites' ? 'font-bold' : 'font-normal' }`}>Favorites</span>
            </div>

            <div onClick={ () => changeActiveTab('Catogory') } className={`flex w-full rounded-md flex-col items-center pb-1 pt-2 hover:cursor-pointer transition-all ${ activeTab === 'Catogory' ? 'font-bold' : 'font-normal text-zinc-500' }`}>
                <Image src={ !darkTheme ? CatogoryDarkIcon : CatogoryLightIcon} width={22} height={22} alt="Catogory tab" />
                <span className={`text-xs capitalize my-1 ${ activeTab === 'Catogory' ? 'font-bold' : 'font-normal' }`}>Catogory</span>
            </div>

            <div onClick={ () => changeActiveTab('Profile') } className={`flex w-full rounded-md flex-col items-center pb-1 pt-2 hover:cursor-pointer transition-all ${ activeTab === 'Profile' ? 'font-bold' : 'font-normal text-zinc-500' }`}>
                <Image src={ !darkTheme ? ProfileDarkIcon : ProfileLightIcon} width={22} height={22} alt="profile tab" />
                <span className={`text-xs capitalize my-1 ${ activeTab === 'Profile' ? 'font-bold' : 'font-normal' }`}>Profile</span>
            </div>

        </div>
    );
}