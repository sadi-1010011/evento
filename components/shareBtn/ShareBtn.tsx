"use client"

import Image from "next/image";
import ShareIcon from "@/assets/icons/sendDark.png";
import ShareIconDark from "@/assets/icons/sendwhite.png";
import { useEffect, useState } from "react";
import { RWebShare } from "react-web-share";
import { usePathname } from "next/navigation";


export default function ShareBtn({ eventId, title }: { eventId: string, title: string }) {

    const pathname = usePathname();
	const [darkTheme, setDarkTheme] = useState<boolean|null>(false);

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

    function handleShare(id: string) {
        alert(`sharing article: ${id}`);
    }

    return (
        <RWebShare
            data={{
                text: "Explore this event in calicut",
                url: pathname,
                title: title,
            }}
        onClick={() => console.log("shared successfully!")}
      >
        <Image className="ml-1 p-1 bg-center" src={ darkTheme ? ShareIconDark : ShareIcon } width={32} height={32} alt="share" onClick={ () => handleShare(eventId)} />
      </RWebShare>
    )
}