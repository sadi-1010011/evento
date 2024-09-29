import catogories from "@/data/catogoriesData";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function CatogoryCard({ active }: { active: string }) {

    const router = useRouter()
    const [selectedCatogory, setSelectedCatogory] = useState(active.toLowerCase());

    return (
        catogories.map(catogory =>
            <div key={catogory.catogory} onClick={ (e)=> { setSelectedCatogory(e.currentTarget?.lastChild?.textContent ? (e.currentTarget.lastChild.textContent).toLowerCase() : '' );  } } className={`inline-block w-2/5 rounded-xl my-2 mx-1 border-2 ${selectedCatogory === catogory.catogory ? 'border-black' : 'border-zinc-300'} `}>
                <Image priority style={{ 'padding': '1.55rem', 'paddingBottom': '0'}} src={ catogory.icon } className="w-20 h-auto -ml-2 pb-0 rounded-md" alt="catogory icon" />
                <h2 className="text-left pt-2 pl-4 pb-3 m-0 capitalize">{ catogory.catogory }</h2>
            </div>)
    )
}