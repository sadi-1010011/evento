import { useState } from "react";
import styles from "./styles.module.css";

export default function EventTabs({ active }: { active: number }) {
    
    // activetab 1 = today, 2 = upcoming;
    const [activeTab, setTab] = useState(active ? active : 1); // default today events

    return (
        <div className="inline-flex w-full items-center justify-center mt-3 font-semibold text-sm mb-5 z-10 relative">
            <button onClick={ (e) => setTab(1)} className={`px-3 pb-2 outline-none capitalize border-black dark:border-white ${ activeTab === 1 ? styles.activetab : styles.inactivetab}`}>today</button>
            <button onClick={ (e) => setTab(2)} className={`px-3 pb-2 outline-none capitalize border-black dark:border-white ${ activeTab === 2 ? styles.activetab : styles.inactivetab}`}>upcoming</button>
            <div className={`absolute bottom-0 pt-0.5 bg-black dark:bg-white rounded-full transition-all ${ activeTab === 1 ? 'left-1/2 w-12 -ml-16' : 'left-1/2 w-16' } `}></div>
        </div>
    );
}
