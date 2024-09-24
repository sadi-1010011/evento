import SearchBar from "@/components/searchbar/SearchBar";
import BottomNavBar from "@/components/bottomnavbar/BottomNavBar";

export default function SettingsPage() {

    return (
        <div className="w-full h-screen pt-3">
            <h1 className="capitalize text-xl text-center font-semibold mt-5 mb-2">settings page</h1>
            <div className="flex-col items-center justify-evenly px-6 py-4">

            <div className="mb-4">
                <SearchBar placeholder="search settings.." />
            </div>

            </div>

            <BottomNavBar active="Profile" />

        </div>
    )
}