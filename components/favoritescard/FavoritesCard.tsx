import DummyImg from "@/assets/eventoLogo.jpeg";
import Favicon from "@/assets/icons/fav-red.png";
import BellIcon from "@/assets/icons/star.png";
import ShareIcon from "@/assets/icons/share-black.png";
import Image from "next/image";
import { useEffect, useRef } from "react";

export default function FavoritesCard({ title }: { title: string }) {

    const favcardref = useRef(null);

    useEffect(()=> {
        // Drop like animation for UX
        if (favcardref.current) {
            const favcard = favcardref.current;
            // console.log(favcard);
            // try {   
            //     favcard.style.transition = '0.6s';
            //     favcard.style.marginBottom = '0.5rem';
            //     favcard.style.padding = '0.9rem';
            // } catch (error) {
            //     console.log('unable to perform animation: ', error);
            // } // as of now animation is disabled
        }
    }, []);

    return (
        <div id="favcard" ref={favcardref} className="flex flex-col w-4/5 items-center pt-3 pb-6 px-4 my-1.5 bg-gray-100 rounded shadow-lg relative z-0 overflow-hidden">
            
            {/* EVENT THUMBNAIL - lazy fetch */}
            <Image priority={false} className="absolute -z-10 w-full h-auto opacity-10 right-0 left-0 bottom-0 top-0 mx-0 aspect-square" src={DummyImg} width={22} height={22} alt="favicon" />

            {/* FAVORITE btn */}
            <Image className="absolute z-10 right-2 top-5 mx-2" src={Favicon} width={22} height={22} alt="favicon" />
            
            <h1 className="text-2xl text-left w-full font-bold capitalize">event title</h1>
            <span className="text-sm text-slate-400 text-left w-full">date</span>

            <div className="flex flex-col gap-2 w-1/2 pt-6">
                <button className="inline-flex items-center justify-center gap-2 py-2 rounded-md border-2 bg-white hover:border-slate-700 hover:bg-slate-700 hover:text-white transition-all capitalize shadow-md">
                    <Image src={BellIcon} width={18} height={18} alt="remind icon" />
                    remind me
                </button>
                <button className="inline-flex items-center justify-center gap-2 py-2 rounded-md border-2 bg-white hover:border-slate-700 hover:bg-slate-700 hover:text-white transition-all capitalize shadow-md">
                    <Image src={ShareIcon} width={18} height={18} alt="remind icon" />
                    tell a friend
                </button>
            </div>
        </div>

    );
}