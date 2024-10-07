"use server"

import BottomNavBar from "@/components/bottomnavbar/BottomNavBar";
import { getSession } from "@/utils/getsession";
import FavoritesContainer from "./FavoritesContainer";
import Link from "next/link";
import User from "@/models/user";
import { getFavoritesAction } from "../serverActions/user/getFavoritesAction";
import connectMongoDB from "@/lib/db";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default async function FavoritesPage() {

    let loginStatus = null;
    let fetchedfavorites: any;


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
            // fetchedfavorites = await Event.find({ '_id': { $in: favorites } });
            // fetchedfavorites = JSON.parse(JSON.stringify(fetchedfavorites));
            fetchedfavorites = await getFavoritesAction(favorites) 
        } catch (error) {
            console.log('Error fetching user favorites!', error);
        }
    } 
        
    return (
        <div className="flex min-h-screen w-full flex-col pt-2 pb-16 bg-evento-white text-black dark:bg-evento-black dark:text-white">

            <h1 className="w-full text-left text-3xl capitalize font-medium pl-6 pt-6 pb-4">favorite events</h1>
            
            <div className="flex w-full flex-col items-center justify-center py-4 px-6">
                {
                    loginStatus ? <div className="w-full text-center text-slate-600"> <h2>{loginStatus}</h2><button className="capitalize w-1/2 bg-evento-black text-white dark:bg-evento-white dark:text-black hover:bg-slate-700 rounded-lg my-6 py-2 px-5 outline-none border-none"><Link className="w-full h-full block" href="/login">Login</Link></button></div>
                        :
                
                    fetchedfavorites.length ? <FavoritesContainer favorites={ fetchedfavorites } />
                        :
                        // LOADING SKELETON
                        <div className="my-8 mx-6 w-full">
                            <SkeletonTheme baseColor="#909090" highlightColor="#888">
                                <Skeleton height={130} className="my-2 rounded-md" count={1} />
                                <Skeleton height={20} className="w-1/2" count={1} />
                                <Skeleton height={50} width={50} className="m-2" borderRadius="50%" count={1} />
                                <Skeleton height={25} className="w-1/3" count={1} />
                                <Skeleton height={25} className="" count={1} />
                            </SkeletonTheme>
                        </div>                        
                }
            </div>

            <BottomNavBar active="Favorites" />
        </div>
    );
}