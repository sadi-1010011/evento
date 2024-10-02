"use client"

import BottomNavBar from "@/components/bottomnavbar/BottomNavBar";
import CatogoryCard from "@/components/catogorycard/Catogorycard";

export default function CatogoryPage() {


    return (
        <div className="w-full h-screen pt-2 bg-evento-white text-black dark:bg-evento-black dark:text-white">

            <h1 className="w-full text-left text-3xl capitalize font-medium pl-6 pt-6 pb-4">Catogories</h1>

            <div className="flex-col items-center justify-evenly px-2 py-4">

                {/* <div className="mb-4">
                    <SearchBar />
                </div> */}

                <div className="flex items-center gap-x-2 justify-center w-full flex-wrap">
                    <CatogoryCard active="All" />
                </div>

            </div>

            {/* <Link href="/events" className="block w-1/2 text-center mt-4 mb-1 p-2 capitalize font-extrabold text-white bg-green-500 rounded-md">
                save catogory
            </Link> */}


            <BottomNavBar active="Catogory" />

        </div>
    )
}