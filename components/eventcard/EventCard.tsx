import Image from "next/image";
import DummyImage from "@/assets/evento.jpeg";
import Link from "next/link";

export default function EventCard({ data }: any) {

    return (
        <div className="flex my-10 flex-col rounded-xl bg-white w-full text-black">
            <div className="absolute bg-white text-sm font-semibold px-2.5 shadow-md m-5 rounded-xl" >{ data.date || 'event date'}</div>
            <span className="absolute right-8 bg-white text-sm font-semibold px-2.5 shadow-md m-5 rounded-xl" >o</span>
            
            {/* LINKS TO EVENT PAGE BY ID */}
            <Link href={`event/${data._id}`}>
                <Image className="rounded-xl w-full h-auto" src={ DummyImage} alt="event picture" />
                <div className="flex flex-row justify-between mt-3 px-2">
                    <h2 className=" font-bold capitalize">{ `${data.title}, ${data.location}`}</h2>
                    {/* <span className="text-sm font-semibold capitalize">rating: 4.9</span> */}
                </div>
                <div className="flex items-center my-2 px-2">
                        <Image className="rounded-full mr-3" src={DummyImage} width={40} height={40} alt="host icon" />
                        <h3 className="capitalize">{data.hostname || 'host name'}</h3>
                    </div>
                <p className="px-2 text-slate-600">{data.description || 'event description'}</p>
                {/* <p className="px-2 text-slate-600">duration</p> */}
                <button className="my-2 pb-2 capitalize font-extrabold text-center w-full text-green-900">view more</button>
            </Link>
        </div>
    );
}