"use client"
import BottomNavBar from "@/components/bottomnavbar/BottomNavBar";
import { useParams } from "next/navigation"

export default function Profile() {

    console.log('profile page..');
    const params = useParams();
    const id = params.id

    return (
        <main className="flex min-h-screen flex-col">
            <h1 className="text-center">Profile: {id} </h1>
            <BottomNavBar active="Profile" />
        </main>
    )
}