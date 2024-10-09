"use client"

// ICONS
import DeleteIcon from "@/assets/icons/delete.png"
import EditIcon from "@/assets/icons/edit.png"
// APi
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { deletEventById } from "@/app/serverActions/events/deleteEvents";

export default function EditDelete({ id }: { id: string }) {

    const [isAdmin, setIsAdmin] = useState(false); // admin features!
    const router = useRouter();

     // ISADMIN USER?
     useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin'); // value is admin name or username!
        if (isAdmin) setIsAdmin(true);
    }, []);

    return (
        isAdmin &&
        (<div className="bg-evento-white text-slate-400 flex items-center justify-evenly py-2.5 mb-20 w-full">
        <button className="bg-red-500 text-white capitalize text-sm font-semibold rounded-full p-2 px-3">
        <Link href={`/edit-event/${id}`}>
            <Image className="block m-auto" src={EditIcon} width={30} height={30} alt="edit icon" />
        </Link>
        </button>

        <span className="d-block font-light text-xs">{ `(admin only!)` }</span>

        <button className="bg-red-500 text-white capitalize text-sm font-semibold rounded-full p-2 px-3">
        <span onClick={ () => deletEventById(id).then(res => { if (res) { alert('deleted successfully!'); router.back(); } }) }>
            <Image className="block m-auto" src={DeleteIcon} width={30} height={30} alt="edit icon" />
        </span>
        </button>
        </div>)
    )
}