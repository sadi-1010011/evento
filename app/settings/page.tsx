"use client"
// import SearchBar from "@/components/searchbar/SearchBar";
import BottomNavBar from "@/components/bottomnavbar/BottomNavBar";
import ThemeToggle from "@/components/themetoggle/themeToggle";
import { userLogout } from "../serverActions/userLogout";
import TopNavbar from "@/components/topnavbar/TopNavbar";

export default function SettingsPage() {

    return (
        <div className="w-full h-screen pt-2 bg-evento-white text-black dark:bg-black dark:text-white">
            <h1 className="capitalize text-xl text-center font-semibold mt-5 mb-2">settings page</h1>
            <div className="flex flex-col w-full min-h-screen items-center justify-center px-6 py-4">

                <button onClick={ () => userLogout() } className="my-6 py-2 px-4 rounded-md border-2 bg-white text-black hover:border-slate-700 hover:bg-slate-700 hover:text-white transition-all capitalize shadow-md">logout</button>

                {/* <SearchBar placeholder="search settings.." /> */}

            </div>

            <BottomNavBar active="Profile" />

        </div>
    )
}