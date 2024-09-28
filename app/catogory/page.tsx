"use client"

// import SearchBar from "@/components/searchbar/SearchBar";
import BottomNavBar from "@/components/bottomnavbar/BottomNavBar";
import CatogoryCard from "@/components/catogorycard/Catogorycard";
// import Link from "next/link";

export default function CatogoryPage() {


    return (
        <div className="w-full h-screen pt-3">
            <h1 className="capitalize text-xl text-center font-semibold mt-5 mb-2">find catogories</h1>
            <div className="flex-col items-center justify-evenly px-6 py-4">

                {/* <div className="mb-4">
                    <SearchBar />
                </div> */}

                <div className="flex items-center justify-center w-full flex-wrap">
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