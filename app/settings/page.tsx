"use client"
// import SearchBar from "@/components/searchbar/SearchBar";
import BottomNavBar from "@/components/bottomnavbar/BottomNavBar";
import { userLogout } from "../serverActions/userLogout";

export default function SettingsPage() {

    function handleUserPreferences() {
        localStorage.removeItem('user')
        localStorage.removeItem('theme')
        localStorage.removeItem('catogory')
        localStorage.removeItem('isAdmin')
        alert('cleared successfully!')
    }
    return (
        <div className="w-full min-h-screen pt-2 bg-evento-white text-black dark:bg-evento-black dark:text-white">
            <h1 className="capitalize text-xl text-center font-semibold mt-5 mb-2">settings page</h1>
            <div className="flex flex-col w-full items-center px-6 py-4">

                <button onClick={ () => handleUserPreferences() } className="py-2 px-4 w-3/4 rounded-md border-2 text-sm bg-slate-700 dark:bg-evento-white text-white dark:text-evento-black hover:border-slate-700 hover:bg-slate-800 hover:text-white transition capitalize shadow-md">clear preferences</button>
                <button onClick={ () => { userLogout(); localStorage.removeItem('isAdmin') } } className="py-2 px-4 w-3/4 rounded-md border-2 bg-slate-700 dark:bg-evento-white text-red-500 dark:text-evento-black hover:border-slate-700 hover:bg-slate-800 hover:text-red-600 font-semibold transition capitalize shadow-md">logout</button>

                {/* <SearchBar placeholder="search settings.." /> */}

            </div>

            <BottomNavBar active="Profile" />

        </div>
    )
}