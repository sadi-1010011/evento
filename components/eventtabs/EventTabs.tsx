import { useState } from "react";
import styles from "./styles.module.css";

export default function EventTabs({ active, clickhandler }: { active: number, clickhandler: Function }) {
    
    // converted to CONTROLLED COMPONENT
    // activetab 1 = today, 2 = upcoming; default 0 = all events!
    // const [active, setTab] = useState(active ? active : 1); // default today events

    return (
        <div className="inline-flex w-full items-center justify-center mt-3 font-semibold text-sm mb-5 z-10 relative">
            <button onClick={ () => clickhandler(1)} className={`px-3 pb-2 outline-none capitalize border-black dark:border-white ${ active === 1 ? styles.activetab : styles.inactivetab}`}>today</button>
            <button onClick={ () => clickhandler(2)} className={`px-3 pb-2 outline-none capitalize border-black dark:border-white ${ active === 2 ? styles.activetab : styles.inactivetab}`}>upcoming</button>
            <div className={`absolute bottom-0 pt-0.5 bg-black dark:bg-white rounded-full transition-all ${ active === 0 ? 'w-0' : (active === 1 ? 'left-1/2 w-12 -ml-16' : 'left-1/2 w-16') } `}></div>
        </div>
    );
}
