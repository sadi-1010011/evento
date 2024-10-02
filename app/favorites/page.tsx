"use server"

import BottomNavBar from "@/components/bottomnavbar/BottomNavBar";
import { getSession } from "@/utils/getsession";
import FavoritesContainer from "./FavoritesContainer";

export default async function FavoritesPage() {

    let loginStatus = null;
    let favorites: any = [];

    const session = await getSession();
    if (!session) {
        loginStatus = 'You nee to login to view favorites!'
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
                    loginStatus ? <h2>{loginStatus}</h2> : favorites && <FavoritesContainer favorites={ favorites } />
                }
            </div>

            <BottomNavBar active="Favorites" />
        </div>
    );
}