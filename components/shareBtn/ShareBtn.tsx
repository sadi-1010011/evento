"use client"

import Image from "next/image";
import ShareIcon from "@/assets/icons/sendDark.png";
import ShareIconDark from "@/assets/icons/sendwhite.png";
import { useEffect, useState } from "react";
import { RWebShare } from "react-web-share";
import { usePathname } from "next/navigation";
import { IncrementShareCount } from "@/app/serverActions/user/IncrementShareCount";


export default function ShareBtn({ eventId, title, host }: { eventId: string, title: string, host: string }) {

    const pathname = usePathname();
	const [darkTheme, setDarkTheme] = useState<boolean|null>(false);
    const [user, setUser] = useState<String|null>(null);

    // DARK THEME
    useEffect(() => {
		if (darkTheme) {
			document.documentElement.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			document.documentElement.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}
	}, [darkTheme]);

    // user login state
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) setUser(user);
    }, [])

    // Share count in Profile!
    function handleShareCount() {
        console.log(`shared article: ${eventId}`);
        if (user && eventId) IncrementShareCount(String(user), eventId).then(res => {
            // console.log('shared events count: ', res);
        })
    }

    return (
        <RWebShare
            data={{
                text: `${title} hosted by ${host} explore this event `,
                url: `https://thepluto.xyz${pathname}`,
                title: "Explore this event in calicut",
            }}
        onClick={() => user && handleShareCount()}
      >
        <Image className="ml-1 p-1" src={ darkTheme ? ShareIcon : ShareIconDark } width={32} height={32} alt="share" />
      </RWebShare>
    )
}