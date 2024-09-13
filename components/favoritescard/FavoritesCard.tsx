import DummyImg from "@/assets/eventoLogo.jpeg";
import Favicon from "@/assets/icons/fav-red.png";
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
        <div id="favcard" ref={favcardref} className="flex w-full items-center justify-between py-2 px-3 my-0.5 bg-gray-100 rounded-s-full" style={{ 'boxShadow': 'rgba(0, 0, 0, 0.25) 0px 5px 5px, rgba(0, 0, 0, 0.12) 0px -5px 10px, rgba(0, 0, 0, 0.12) 0px 5px 2px'}}>
            <Image className="rounded-s-md mr-3 opacity-60" priority src={DummyImg} width={80} height={60} alt="event thumbnail" />
            <div className="flex flex-col w-full px-2">
                <h1 className="text-md text-black font-bold capitalize m-0 p-0">{title}</h1>
                <span className="text-xs text-slate-400">date</span>
            </div>
            <Image className="mx-2" src={Favicon} width={22} height={22} alt="favicon" />
        </div>
    );
}