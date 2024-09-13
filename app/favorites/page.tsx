"use client"

import BottomNavBar from "@/components/bottomnavbar/BottomNavBar";
import FavoritesCard from "@/components/favoritescard/FavoritesCard";

export default function FavoritesPage() {

    return (
        <div className="flex min-h-screen w-full flex-col px-3 py-6 ">
            <h1 className="w-full text-center text-lg text-black capitalize font-bold">favorited events</h1>
            
            <div className="flex w-full flex-col items-center justify-center py-4">
                <FavoritesCard title="onam celebration" />
                <FavoritesCard title="Sadiq funny dance" />
                <FavoritesCard title="Mishal potan Event" />
            </div>

            <BottomNavBar active="Favorites" />
        </div>
    );
}