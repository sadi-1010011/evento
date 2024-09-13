"use client"

import SearchBar from "@/components/searchbar/SearchBar";
import BottomNavBar from "@/components/bottomnavbar/BottomNavBar";
import CatogoryCard from "@/components/catogorycard/Catogorycard";

export default function CatogoryPage() {


    return (
        <div className="w-screen h-screen pt-3">
            <h1 className="capitalize text-xl text-center font-semibold mt-5 mb-2">find catogories</h1>
            <div className="flex-col items-center justify-evenly px-6 py-4">

            <div className="mb-4">
                <SearchBar />
            </div>

            <div className="flex-col items-center justify-center w-full">
                <CatogoryCard active="All" />
            </div>

            </div>

            <BottomNavBar active="Catogory" />

        </div>
    )
}