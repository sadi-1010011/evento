import catogories from "@/data/catogoriesData";
import CatogoryTranspIcon from "@/assets/icons/categories-transparent.png";
import CatogoryIcon from "@/assets/icons/categories.png";
import Image from "next/image";
import { useState } from "react";


export default function CatogoryCard({ active }: { active: string }) {

    const [selectedCatogory, setSelectedCatogory] = useState(active.toLowerCase());

    return (
        catogories.map(catogory =>
            <div key={catogory} onClick={ (e)=> setSelectedCatogory(e.currentTarget?.lastChild?.textContent ? (e.currentTarget.lastChild.textContent).toLowerCase() : '' ) /* router.push('/home') */ } className={`p-1 inline-block mx-1 rounded-xl my-2 ${selectedCatogory === catogory ? 'bg-green-100 text-black' : 'bg-gray-100 text-black'} `}>
                <Image priority src={ selectedCatogory === catogory ? CatogoryIcon : CatogoryTranspIcon } className="w-auto h-auto p-4 pb-0 rounded-md" alt="catogory icon" />
                <h2 className="text-center pt-1 pb-3 m-0 capitalize font-semibold">{ catogory }</h2>
            </div>)
    )
}