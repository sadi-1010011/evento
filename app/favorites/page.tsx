"use server"

import BottomNavBar from "@/components/bottomnavbar/BottomNavBar";
import { getSession } from "@/utils/getsession";
import FavoritesContainer from "./FavoritesContainer";
import Link from "next/link";
import User from "@/models/user";
import { getFavoritesAction } from "../serverActions/user/getFavoritesAction";
import connectMongoDB from "@/lib/db";

export default async function FavoritesPage() {

    let loginStatus = null;
    let zerofavorites = false;
    let fetchedfavorites: any = [];


    const session = await getSession();
    if (!session) {
        loginStatus = 'You need to login to view favorites!'
    }

    if (session) {
        // user is logged in !
        const user = session.user[0];
        const userId = `${user._id}`;

    // connect to DB!
    await connectMongoDB();

        try {
             // find user
            const user = await User.findById({ _id: userId });
            if (!user) return loginStatus = 'Not a valid User Id!';
            const { favorites } = user;            
             // find favorites
            favorites.length ? fetchedfavorites = await getFavoritesAction(favorites) : zerofavorites = true;
            // console.log(fetchedfavorites)
        } catch (error) {
            console.log('Error fetching user favorites!', error);
        }
    } 
        
    return (
        <div className="flex min-h-screen w-full flex-col pt-2 pb-16 bg-evento-white text-black dark:bg-evento-black dark:text-white">

            <h1 className="w-full text-left text-3xl capitalize font-medium pl-6 pt-6 pb-4">favorite events</h1>
            
            <div className="flex w-full flex-col items-center justify-center py-4 px-6">
                {
                    loginStatus && <div className="w-full text-center text-slate-600"> <h2>{loginStatus}</h2><button className="capitalize w-1/2 bg-evento-black text-white dark:bg-evento-white dark:text-black hover:bg-slate-700 rounded-lg my-6 py-2 px-5 outline-none border-none"><Link className="w-full h-full block" href="/login">Login</Link></button></div>
                }
                {
                    !fetchedfavorites.length ? 

                            zerofavorites && <div className="w-full text-center text-slate-600">No favorites added!</div>
                            
                        :
                            <FavoritesContainer favorites={ fetchedfavorites } />
                                      
                }
            </div>

            <BottomNavBar active="Favorites" />
        </div>
    );
}