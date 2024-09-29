"use client"

import Image from "next/image";
import AddIcon from "@/assets/icons/plus.png";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import TopNavbar from "@/components/topnavbar/TopNavbar";
import { useFormStatus } from "react-dom";
import { DateTime } from "luxon";
// import { put_eventById } from "@/app/(fetchAPI)/restAPI";

export default function EditEventUI({ data }: { data: any }) {

    const [eventdata, setEventData] = useState<any>(data);
    const [dropedImage, setDroppedImage] = useState('');
    const [formerrors, setFormErrors] = useState([]);
    const { pending } = useFormStatus();
    const router = useRouter();

    function getDroppedImage(event: any) {
        const link = event.target.value;
        console.log(link)
        if (link.length > 8) { // more regExp evaluation soon
            setDroppedImage(link);
        } else return 0;
    }

    // data handlers

    function handle_Title(e: any) {
        if (!e) return
        e.preventDefault();
        const value = e.currentTarget.value;
        // alert(value)
        setEventData((previusData: any) => { return { ...previusData, title: value }})
    }

    function handle_Location(e: any) {
        // alert(value)
        if (!e) return
        e.preventDefault();
        const value = e.currentTarget.value;
        setEventData((previusData: any) => { return { ...previusData, location: value }})
    }

    function handle_Hostname(e: any) {
         // alert(value)
         if (!e) return
         e.preventDefault();
         const value = e.currentTarget.value;
         setEventData((previusData: any) => { return { ...previusData, hostname: value }})
    }

    function handle_Description(e: any) {
         // alert(value)
         if (!e) return
         e.preventDefault();
         const value = e.currentTarget.value;
         setEventData((previusData: any) => { return { ...previusData, description: value }})
    }

    function handle_Date(e: any) {
        if (!e) return
        e.preventDefault();
        const value = e.currentTarget.value;
        // alert(value)
        setEventData((previusData:any) => { return { ...previusData, date: value }})
    }

    function handle_Paid(e: any) {
        if (!e) return
        const value = e.currentTarget.checked;
        // console.log(value)
        setEventData((previusData: any) => { return { ...previusData, paid: value }})    // for bool value !
    }

    function handle_Ticketprice(e: any) {
        if (!e) return
        e.preventDefault();
        const value = e.currentTarget.value;
        // alert(value)
        setEventData((previusData: any) => { return { ...previusData, ticketprice: value }})        
    }

    function handle_Catogory(e: any) {
        if(!e) return
        const value = e.currentTarget.value;
        console.log(e.currentTarget.value)
        setEventData((previusData: any) => { return { ...previusData, catogory: value }})        
    }

    async function handle_Submit(e: any, id: string) {
        if(!e) return
        e.preventDefault();
        console.log('submitting data..');
        console.table(eventdata);
        // submit data.. to backend
        const response = await fetch(`/api/events/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: eventdata }),
        })
            if (response.ok) {
                console.log('data updated successfully!');
                router.push('/events');
            }
            else console.log('something went wrong! in saving to DB ', response.statusText);
    }

    return (
        <div className="flex items-center justify-center w-full min-h-screen py-12 px-2 bg-evento-white text-black dark:bg-black dark:text-white">

            <div className="flex flex-col items-center justify-center w-full sm:w-4/5 md:w-4/5 mx-2 px-4 py-8 shadow-evento-shadow bg-evento-white text-black dark:bg-black dark:text-white rounded-3xl overflow-y-scroll">
            <TopNavbar />
                <h1 className="text-2xl font-bold capitalize">Update event</h1>
                <h1 className="capitalize text-xs text-center font-light mt-2 mb-2">already have event detail? <Link href="/profile">Scan poster</Link></h1>

            <form action={ (e) => handle_Submit(e, eventdata._id) } className="w-full flex flex-col gap-2 items-center justify-center my-4 py-2 px-2">
                
                {/* IMAGE DROP */}
                <div className="flex flex-col gap-0.5 pt-4 items-center justify-center rounded-xl bg-evento-white border-2 border-zinc-300 dark:bg-zinc-900 placeholder-slate-600 w-full py-2 px-5 outline-none" >
                    <Image priority className="rounded-xl w-auto h-auto opacity-20" src={ dropedImage ? dropedImage : AddIcon} width={100} height={100} alt="event picture" />
                    <input onChange={ (event) => getDroppedImage(event) } className="bg-evento-white dark:bg-zinc-900 placeholder-slate-600 w-full focus:border-2 py-2 px-5 outline-none text-center rounded-lg focus:border-evento-black text-xs capitalize" type="text" placeholder="drop image or link" />
                </div>

                    
                {/* EVENT TITLE */}
                <input onChange={ (e)=> handle_Title(e)} className="bg-evento-white border-2 border-zinc-300 dark:bg-zinc-900 placeholder-slate-600 w-full focus:border-2 rounded-lg focus:border-evento-black py-3 px-5 outline-none" type="text" placeholder="event title" value={eventdata.title} />
                
                {/* EVENT HOST */}
                <input onChange={ (e)=> handle_Hostname(e)} className="bg-evento-white border-2 border-zinc-300 dark:bg-zinc-900 placeholder-slate-600 w-full focus:border-2 rounded-lg focus:border-evento-black py-3 px-5 outline-none" type="text" placeholder="host name" value={eventdata.hostname} />
                
                {/* EVENT DATE */}
                
                <div className="flex gap-1 w-full text-center">
                    <input onChange={ (e)=> handle_Date(e)} className="bg-evento-white border-2 border-zinc-300 dark:bg-zinc-900 placeholder-slate-600 w-1/2 focus:border-2 rounded-l-full py-3 px-5 outline-none border-none" type="date" defaultValue={ DateTime.now().toISODate() } />
                    <input onChange={ (e)=> console.log('handle event time input')} className="bg-evento-white border-2 border-zinc-300 dark:bg-zinc-900 placeholder-slate-600 w-1/2 focus:border-2 rounded-r-full py-3 px-5 outline-none border-none" type="time" defaultValue="12:00" />
                </div>

                {/* EVENT LOCATION */}
                <input onChange={ (e)=> handle_Location(e)} className="bg-evento-white border-2 border-zinc-300 dark:bg-zinc-900 placeholder-slate-600 w-full focus:border-2 rounded-lg focus:border-evento-black py-3 px-5 outline-none" type="text" placeholder="location" value={eventdata.location} />

                {/* EVENT PAID */}
                {/* <input onChange={ (e)=> handle_Paid(e)} className="mx-2 w-5" name="checkbox" type="checkbox" defaultChecked={ eventdata.paid } /> */}

                <span className="first-letter:capitalize w-4/5 text-xs text-left font-light mt-2 mb-2">This information will be displayed on the event title card!</span>

                <hr style={{ width: '80%', display: 'block', margin: '0.8rem auto' }} />
                
                <h1 className="text-xl text-center my-4 font-bold capitalize">Additional information</h1>

                {/* IMAGE;s DROP */}
                <div className="flex flex-col gap-0.5 pt-4 items-center justify-center rounded-xl bg-evento-white border-2 border-zinc-300 dark:bg-zinc-900 placeholder-slate-600 w-full py-2 px-5 outline-none" >
                    <Image className="rounded-xl w-auto h-auto opacity-20" src={ AddIcon} width={100} height={100} alt="event picture" />
                    <input className="bg-evento-white dark:bg-zinc-900 placeholder-slate-600 w-full focus:border-2 py-3 px-5 outline-none text-center rounded-lg focus:border-evento-black text-xs capitalize" type="text" placeholder="drop additional images or link" />
                </div>
                
                {/* EVENT DESCRIPTION */}
                <input onChange={ (e)=> handle_Description(e)} className="bg-evento-white border-2 border-zinc-300 dark:bg-zinc-900 placeholder-slate-600 w-full focus:border-2 rounded-lg focus:border-evento-black py-3 px-5 outline-none" type="text" placeholder="event description" value={eventdata.description} />

                {/* EVENT TYPE */}
                <div className="block bg-evento-white border-2 border-zinc-300 dark:bg-zinc-900 placeholder-slate-600 w-full focus:border-2 rounded-lg focus:border-evento-black py-3 px-5 outline-none">
                    <select onChange={ (e)=> handle_Catogory(e)} className="w-full text-left bg-evento-white dark:bg-zinc-900 placeholder-slate-600 rounded-md text-sm capitalize outline-none">
                        <option>music</option>
                        <option>dance</option>
                        <option>sports</option>
                        <option>arts</option>
                        <option>meets</option>
                    </select>
                </div>

                {/* TICKET PRICE */}
                <input onChange={ (e)=> handle_Ticketprice(e)} className="bg-evento-white border-2 border-zinc-300 dark:bg-zinc-900 placeholder-slate-600 w-full focus:border-2 rounded-lg focus:border-evento-black py-3 px-5 outline-none" name="ticketprice" type="number" placeholder="ticket price" value={eventdata.ticketprice} />

                {/* ADDITIONAL INFO */}
                <input className="bg-evento-white border-2 border-zinc-300 dark:bg-zinc-900 placeholder-slate-600 w-full focus:border-2 rounded-lg focus:border-evento-black py-3 px-5 outline-none" type="text" placeholder="Additional Info .." />

                <button type="submit" onClick={ (e)=> handle_Submit(e, eventdata._id) } className="font-semibold capitalize w-1/2 bg-blue-950 text-white hover:bg-slate-700 rounded-lg focus:border-evento-black my-2 py-3 px-5 outline-none border-none">{ pending ? 'updating..' : 'update event' }</button>
                {
                    formerrors && (formerrors.map((err: string, i: number) => <span key={i} className="text-sm -m-1 first-letter:capitalize font-light text-red-400">{ err }</span>))
                }

            </form>
        </div>
           
        </div>
    );
}