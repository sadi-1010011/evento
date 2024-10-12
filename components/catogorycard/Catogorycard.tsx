"use client";
import catogories from "@/data/catogoriesData";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function CatogoryCard({ active }: { active: string }) {

    const router = useRouter()
    const [darkTheme, setDarkTheme] = useState(false);
    const [firstactivetab, setFirstactiveTab] = useState(active.toLowerCase());
    const [selectedCatogory, setSelectedCatogory] = useState();

    useEffect(() => {
        const storedCatogory = localStorage.getItem('catogory');
        if (storedCatogory) setFirstactiveTab(storedCatogory);
        if (selectedCatogory) localStorage.setItem('catogory', selectedCatogory);
    }, [selectedCatogory]);

    useEffect(() => {
        // create and append param
        const params = new URLSearchParams();
        if (selectedCatogory) {
            params.set("catogory", selectedCatogory);
            router.push(`/events?${params.toString()}`);
        }
    }, [selectedCatogory]);
 
    useEffect(() => {
		const theme = localStorage.getItem('theme');
		if (theme === 'dark') {
			setDarkTheme(true);
		} else {
			setDarkTheme(false);
		}
	}, [darkTheme]);

    function handle_catogory(e: any) {
        const currentTab = e.currentTarget?.lastChild?.textContent;
        setFirstactiveTab('');
        setSelectedCatogory(currentTab ? (currentTab).toLowerCase() : 'all' );
    }

    return (
        catogories.map(catogory =>
            <div key={catogory.catogory} onClick={ (e) => handle_catogory(e) } className={`inline-block w-2/5 rounded-xl my-2 mx-1 border-2 group ${(selectedCatogory === catogory.catogory || firstactivetab === catogory.catogory) ? 'border-evento-black dark:border-evento-border-white dark:evento-border-white' : 'border-zinc-300 dark:border-evento-border-black'} `}>
                <Image priority style={{ 'padding': '1.55rem', 'paddingBottom': '0'}} src={ darkTheme ? catogory.iconDark : catogory.icon } className="w-20 h-auto -ml-2 pb-0 rounded-md transition group-hover:scale-110" alt="catogory icon" />
                <h2 className="text-left pt-2 pl-4 pb-3 m-0 capitalize">{ catogory.catogory }</h2>
            </div>)
    )
}