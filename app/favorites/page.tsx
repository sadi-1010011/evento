"use server"

import BottomNavBar from "@/components/bottomnavbar/BottomNavBar";
import { getSession } from "@/utils/getsession";
import FavoritesContainer from "./FavoritesContainer";
import Link from "next/link";

export default async function FavoritesPage() {

    let loginStatus = null;
    let favorites = [];

    const session = await getSession();
    if (!session) {
        loginStatus = 'You need to login to view favorites!'
    }

    if (session) {
        const user = session.user[0];
        favorites = user.favorites;

    }
        
    return (
        <div className="flex min-h-screen w-full flex-col pt-2 bg-evento-white text-black dark:bg-evento-black dark:text-white">

            <h1 className="w-full text-left text-3xl capitalize font-medium pl-6 pt-6 pb-4">favorite events</h1>
            
            <div className="flex w-full flex-col items-center justify-center py-4 px-6">
                {
                    loginStatus ? <div className="w-full text-center"> <h2>{loginStatus}</h2><button className="capitalize w-1/2 bg-evento-black text-white dark:bg-evento-white dark:text-black hover:bg-slate-700 rounded-lg my-6 py-2 px-5 outline-none border-none"><Link href="/login">Login</Link></button></div>
                        :
                    favorites && <FavoritesContainer favorites={ favorites } />
                }
            </div>

            <BottomNavBar active="Favorites" />
        </div>
    );
}