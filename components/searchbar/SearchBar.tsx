"use client"

import Image from "next/image";
import SearchIcon from "@/assets/evento.jpeg";
import { useState } from "react";
import styles from "./styles.module.css";

export default function SearchBar() {

    const [searchtext, setSearchText] = useState('');

    function changeSearchText(text: string) {
        // if any text processing, it goes here!
        setSearchText(text);
    }
    return (
        <div className="my-2 flex flex-row justify-evenly w-full">
            <div className={`py-2 px-3 rounded-full bg-white w-full flex flex-row items-center overflow-hidden ${styles.searchbar}`}>
                <Image src={SearchIcon} className="rounded-full" width={20} height={20} alt="search icon"/>
                <input  onChange={ (event) => changeSearchText(event.currentTarget.value) } className="px-3 text-lg text-black border-none outline-none font-semibold" type="text" placeholder="Search events" value={searchtext} />
            </div>
            <button className="mx-4 p-3 bg-white rounded-full">
                <Image onClick={ () => alert('apply filters here..')} className="rounded" src={SearchIcon} width={30} height={30} alt="filter icon" />
            </button>
        </div>
    );
}