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
        <div className="flex min-h-screen w-full flex-col pt-2 bg-white text-black dark:bg-black dark:text-white">

            <TopNavbar />

            {/* <h1 className="w-full text-center text-xl capitalize font-bold">favorite events</h1> */}
            
            <div className="flex w-full flex-col items-center justify-center py-4 px-4">
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