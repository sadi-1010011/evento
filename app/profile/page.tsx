
import BottomNavBar from "@/components/bottomnavbar/BottomNavBar";
import ProfileCard from "@/components/profilecard/ProfileCard";
import TopNavbar from "@/components/topnavbar/TopNavbar";
import { getSession } from "@/utils/getsession";
import { redirect } from "next/navigation";
// SIGN IN PROVIDERS
// import { signIn } from "next-auth/react";

export default async function ProfilePage() {

    const session = await getSession();

    if (!session) redirect("/register");
    
    const user = session.user[0];

    return (
        <div className="flex items-center min-h-screen w-full pt-2 overflow-x-hidden flex-col bg-evento-white dark:bg-black dark:text-white transition-all">
        
            <TopNavbar />

            <ProfileCard name={ user.username } email= { user.email} />

            {/* <pre>
                { JSON.stringify(session, null, 2) }
            </pre> */}
            
            <BottomNavBar active="Profile" />
        </div>
    );
}