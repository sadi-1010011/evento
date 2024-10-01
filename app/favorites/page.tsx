"use server"

import BottomNavBar from "@/components/bottomnavbar/BottomNavBar";
import FavoritesCard from "@/components/favoritescard/FavoritesCard";
import TopNavbar from "@/components/topnavbar/TopNavbar";
import data from "@/data/eventData";
// import { getSession } from "@/utils/getsession";
// import { redirect } from "next/navigation";

export default async function FavoritesPage() {

    // const session = await getSession();
    // if (!session) {
    //     redirect("/login");
    // }



    return (
        <div className="flex min-h-screen w-full flex-col pt-2 bg-evento-white text-black dark:bg-black dark:text-white">

            <h1 className="w-full text-left text-3xl capitalize font-medium pl-6 pt-6 pb-4">favorite events</h1>
            
            <div className="flex w-full flex-col items-center justify-center py-4 px-6">
                {
                    data.map((event: any, i: number) =>
                        i < 1 && <FavoritesCard key={i} data={event} checked />
                    )
                }
            </div>

            <BottomNavBar active="Favorites" />
        </div>
    );
}