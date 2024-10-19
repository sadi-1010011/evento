import BottomNavBar from "@/components/bottomnavbar/BottomNavBar";
import ProfileCard from "@/components/profilecard/ProfileCard";
import TopNavbar from "@/components/topnavbar/TopNavbar";
import { getSession } from "@/utils/getsession";
import { redirect } from "next/navigation";

export default async function ProfilePage() {

    console.log('reading session!');
    const session = await getSession();
    if (!session) redirect("/login");
    
    const user = session.user[0];
    const isAdmin = user.isAdmin || false;
    const profileurlkey: string = user.profileurlkey || '';
    
    return (
        <div className="flex items-center min-h-screen w-full pt-2 overflow-x-hidden flex-col bg-evento-white dark:bg-evento-black dark:text-white transition-all">
        
            <TopNavbar />

            <ProfileCard id={ user._id } isadmin={isAdmin} name={ user.username } profileurlkey={ profileurlkey} likedEvents={ 0 } />

            {/* <pre>
                { JSON.stringify(session, null, 2) }
            </pre> */}
            
            <BottomNavBar active="Profile" />
        </div>
    );
}