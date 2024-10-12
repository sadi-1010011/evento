"use client"

import { useEffect, useRef, useState } from "react"

export default function Modal({ text, success }: { text: string, success: boolean}) {
    
    const modalref = useRef<null|HTMLDivElement>(null);
    
    useEffect(() => {
        const modal = modalref.current;
        if (text && modal) {
            // ANIMATION
            modal.classList.add('top-4');
            modal.style.transition = 'top 1s linear finite';
            setTimeout(()=> {
                modal.classList.add('hidden');
            }, 2000);
        }
    }, []);
    return (
        <div ref={modalref} className={`absolute left-0 right-0 m-0 p-0 transition-all rounded-md ${ text ? 'block' : 'hidden'}`}>
            <div className={`relative p-4 mx-4 shadow-evento-shadow border-2 border-l-4 border-evento-white dark:border-evento-black bg-evento-white dark:bg-black transition-all rounded-md ${ success ? 'border-l-green-400' : 'border-l-red-400' }`}>
                { text }
            </div>
        </div>
    )
}