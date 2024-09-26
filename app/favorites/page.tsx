"use client"

import BottomNavBar from "@/components/bottomnavbar/BottomNavBar";
import FavoritesCard from "@/components/favoritescard/FavoritesCard";
import data from "@/data/eventData";

export default function FavoritesPage() {

    return (
        <div className="flex min-h-screen w-full flex-col px-4 py-6 ">
            <h1 className="w-full text-center text-xl text-black capitalize font-bold">favorite events</h1>
            
            <div className="flex w-full flex-col items-center justify-center py-4">
                {
                    data.map((event: any, i: number) =>
                        i < 3 && <FavoritesCard key={i} title={ event.title } />
                    )
                }
            </div>

            <BottomNavBar active="Favorites" />
        </div>
    );
}