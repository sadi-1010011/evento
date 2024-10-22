import BottomNavBar from "@/components/bottomnavbar/BottomNavBar";
import ProfileCard from "@/components/profilecard/ProfileCard";
import TopNavbar from "@/components/topnavbar/TopNavbar";
import { getSession } from "@/utils/getsession";
import { redirect } from "next/navigation";
import { getUserInfoAction } from "../serverActions/user/getUserInfoAction";

export default async function ProfilePage() {

    console.log('reading session!');
    const session = await getSession();
    if (!session) redirect("/register");
    
    const user = session.user[0];
    const userId = String(user._id);
    const isAdmin = user.isAdmin || false;
    
    
    return (
        <div className="flex items-center min-h-screen w-full pt-2 overflow-x-hidden flex-col bg-evento-white dark:bg-evento-black dark:text-white transition-all">
        
            <TopNavbar />

            <ProfileCard id={ userId } isadmin={isAdmin} name={ user.username } />

            {/* <pre>
                { JSON.stringify(session, null, 2) }
            </pre> */}
            
            <BottomNavBar active="Profile" />
        </div>
    );
}