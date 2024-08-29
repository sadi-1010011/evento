"use client"

import DummyImg from "@/assets/evento.jpeg";
import catogories from "@/data/catogoriesData";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CatogoryPage() {

    const [selectedCatogory, setSelectedCatogory] = useState('sports');
    const router = useRouter();

    return (
        <div className="w-screen h-screen pt-3">
            <h1 className="capitalize text-xl text-center font-semibold mt-5 mb-2">find catogories</h1>
            <div className="flex items-center justify-evenly flex-wrap px-6 py-4">
                {
                    // when clicked, sets the selected catogory item
                    catogories.map(catogory => <div key={catogory} onClick={ (e)=> setSelectedCatogory(e.currentTarget?.lastChild?.textContent ? (e.currentTarget.lastChild.textContent).toLowerCase() : '' ) /* router.push('/home') */ } className={`w-5/12 p-1 transition-all rounded-md my-2 ${selectedCatogory === catogory ? 'bg-slate-400 text-black' : 'bg-slate-700'} `}>
                        <Image priority src={DummyImg} className="w-full h-auto rounded-md" alt="catogory icon" />
                        <h2 className="text-center pt-1 m-0 capitalize font-semibold">{ catogory }</h2>
                    </div>)
                }
            </div>
        </div>
    )
}