"use client"

import DummyIcons from "@/assets/evento.jpeg";
import catogories from "@/data/catogoriesData";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Catogories() {

    const [activeTab, setActiveTab] = useState('sports');
    const router = useRouter();
    const catogoryLimit = 5; // number of items to show in UI.

    function changeActiveCatogory(item: string) {
        setActiveTab(item);
    }

    return (
        <div className="flex w-full flex-row items-center justify-evenly border-b-2 border-b-slate-900">
            {
                catogories.map((item, i) => i >= catogoryLimit -1  ? false : // -1 for array index
                    (<div key={item} onClick={ () => changeActiveCatogory(item) } onMouseOver={ (event)=> { event.currentTarget.style.backgroundColor = 'rgb(75 70 65 / 80%)' }} onMouseLeave={ (event)=> { event.currentTarget.style.backgroundColor = 'black' }} className={`flex w-full rounded-md flex-col items-center py-2 transition-all ${ activeTab === item ? 'border-b-2' : 'border-b-0' }`}>
                        <Image className="bg-white rounded-full" src={DummyIcons} width={30} height={30} alt="catogory icon" />
                        <span className="text-xs font-semibold capitalize my-1">{ item }</span>
                    </div>))
            }
                    {/* MORE BTN -> */}
                    
                    <div onClick={ () => router.push('/catogory') } onMouseOver={ (event)=> { event.currentTarget.style.backgroundColor = 'rgb(75 70 65 / 80%)' }} onMouseLeave={ (event)=> { event.currentTarget.style.backgroundColor = 'black' }} className='flex w-full rounded-md flex-col items-center py-2 transition-all border-b-0'>
                        <Image className="bg-white rounded-full" src={DummyIcons} width={30} height={30} alt="more icon" />
                        <span className="text-xs font-semibold capitalize my-1">More</span>
                    </div>

        </div>
    );
}