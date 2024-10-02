"use client";

// import BackIcon from "@/assets/icons/back.png";
// import BackBlueIcon from "@/assets/icons/back-blue.png";
import SettingsIcon from "@/assets/icons/settings.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import ThemeToggle from "../themetoggle/themeToggle";

export default function TopNavbar() {

    const router = useRouter();

    return (
        <div className="flex items-center justify-end w-full p-3 z-50 overflow-hidden bg-transparent text-black dark:bg-evento-black dark:text-white">
            {/* { back && <Image onClick={ () => router.back()} width={22} height={22} src={ BackBlueIcon } alt="back" />} */}
            <div className="inline-flex items-center w-full justify-between pr-2">
                <ThemeToggle />
                <Image onClick={ () => router.push("/settings")} width={28} height={28} className="border-2 rounded-full bg-white h-auto hover:bg-gray-400 transition-all" src={SettingsIcon} alt="settings icon" />
            </div>
        </div>
    )
}