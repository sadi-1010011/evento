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
        <div id="favcard" ref={favcardref} className="flex w-full items-center justify-between py-2 px-4 my-1 bg-gray-100 rounded-s-full shadow-xl">
            <Image className="rounded-s-md mr-3 opacity-60" priority src={DummyImg} width={80} height={60} alt="event thumbnail" />
            <div className="flex flex-col w-full px-2">
                <h1 className="text-md text-black font-bold capitalize m-0 p-0">{title}</h1>
                <span className="text-xs text-slate-400">date</span>
                <div className="flex items-center justify-center gap-2">
                    <button className="flex my-1 py-1 px-2 items-center justify-center capitalize rounded-md border-2 border-slate-400 hover:bg-slate-700 hover:text-white transition-all">
                        remind me
                    </button>
                    <button className="flex my-1 py-1 px-2 items-center justify-center capitalize rounded-md border-2 border-slate-400 hover:bg-slate-700 hover:text-white transition-all">
                        tell a friend
                    </button>
                </div>
            </div>
            <Image className="mx-2" src={Favicon} width={22} height={22} alt="favicon" />
            
            {/* <div className="flex my-6 mx-4 py-3 items-center justify-center rounded-md border-2 border-slate-800 hover:bg-slate-700 hover:text-white transition-all">
                <h2 className="capitalize ">Remind me</h2>
            </div> */}
        </div>

    );
}