
import BottomNavBar from "@/components/bottomnavbar/BottomNavBar";
import ProfileCard from "@/components/profilecard/ProfileCard";
import { getSession } from "@/utils/getsession";
import { redirect } from "next/navigation";
// import SettingsIcon from "@/assets/icons/settings.png";
// SIGN IN PROVIDERS
// import { signIn } from "next-auth/react";

export default async function ProfilePage() {

    const session = await getSession();

    if (!session) redirect("/login");
    
    const user = session.user[0];

    return (
        <div className="flex items-center min-h-screen w-full overflow-x-hidden flex-col pt-4 px-2">

            <ProfileCard name={ user.username } email= { user.email} />

            <pre>
                { JSON.stringify(session, null, 2) }
            </pre>
            
            <BottomNavBar active="Profile" />
        </div>
    );
}