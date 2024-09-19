
// ICONS
import DeleteIcon from "@/assets/icons/delete.png"
import EditIcon from "@/assets/icons/edit.png"
// APi
import { delete_eventById } from "@/app/(fetchAPI)/restAPI";
import Image from "next/image";
import Link from "next/link";

export default function EditDelete({ id }: { id: string }) {

    return (
        <div className="bg-slate-800 text-slate-400 flex items-center justify-evenly py-2.5 mb-10 w-full">
        <button className="bg-red-500 text-white capitalize text-sm font-semibold rounded-full p-2 px-3">
        <Link href={`/edit-event/${id}`}>
            <Image className="block m-auto" src={EditIcon} width={30} height={30} alt="edit icon" />
        </Link>
        </button>

        <span className="d-block font-light text-xs">{ `(admin only!)` }</span>

        <button className="bg-red-500 text-white capitalize text-sm font-semibold rounded-full p-2 px-3">
        <span onClick={ () => delete_eventById(id).then(res => { if (res.ok) alert('deleted successfully!'); }) }>
            <Image className="block m-auto" src={DeleteIcon} width={30} height={30} alt="edit icon" />
        </span>
        </button>
        </div>
    )
}