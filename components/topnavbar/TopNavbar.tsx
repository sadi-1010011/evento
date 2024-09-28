"use client";

// import BackIcon from "@/assets/icons/back.png";
import SettingsIcon from "@/assets/icons/settings.png";
import BackBlueIcon from "@/assets/icons/back-blue.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function TopNavbar() {

    const router = useRouter();

    return (
        <div className="flex items-center justify-between w-full p-3 z-50 overflow-hidden bg-white text-black dark:bg-black dark:text-white shadow-sm">
            <Image onClick={ () => router.back()} width={22} height={22} src={ BackBlueIcon } alt="back" />
            <Image onClick={ () => router.push("/settings")} width={28} height={28} className="border-2 rounded-full bg-white h-auto hover:bg-gray-400 transition-all" src={SettingsIcon} alt="settings icon" />
        </div>
    )
}