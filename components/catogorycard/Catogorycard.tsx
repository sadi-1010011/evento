import catogories from "@/data/catogoriesData";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function CatogoryCard({ active }: { active: string }) {

    const router = useRouter()
    const [selectedCatogory, setSelectedCatogory] = useState(active.toLowerCase());

    return (
        catogories.map(catogory =>
            <div key={catogory.catogory} onClick={ (e)=> { setSelectedCatogory(e.currentTarget?.lastChild?.textContent ? (e.currentTarget.lastChild.textContent).toLowerCase() : '' ); router.push('/events') } } className={`inline-block w-2/5 rounded-xl my-2 mx-1 ${selectedCatogory === catogory.catogory ? 'bg-green-100 text-black' : 'bg-gray-100 text-black'} `}>
                <Image priority src={ catogory.icon } className="w-20 h-auto m-auto p-4 pb-0 rounded-md" alt="catogory icon" />
                <h2 className="text-center pt-1 pb-3 m-0 capitalize font-semibold">{ catogory.catogory }</h2>
            </div>)
    )
}