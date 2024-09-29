"use client"

import Image from "next/image";
import DummyImage from "@/assets/evento.jpeg";
import AddIcon from "@/assets/icons/plus.png";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { post_event } from "../(fetchAPI)/restAPI";
import { DateTime } from "luxon";
import { useFormStatus } from "react-dom";

export default function CreateEvent() {

    const [eventdata, setEventData] = useState({
        title: '',
        catogory: 'all',
        hostname: '',
        location: '',
        description: '',
        ticketprice: '',
        thumbnail: '',
        paid: false, // default to free event
        date: DateTime.now().toFormat('ff') // event date
    });
    const [dropedImage, setDropedImage] = useState('');
    const [formerrors, setFormErrors] = useState<any>();
    const { pending } = useFormStatus();
    const router = useRouter();

    useEffect(() => {
        console.log('image upload coming soon..');
        // https://dummyjson.com/image/SIZE/?text=TEXT
        // fetch(`https://dummyjson.com/image/400x200/008080/ffffff?text=${ eventdata.title }`)
        //     .then(response => response.blob()) // Convert response to blob
        //     .then(blob => {
        //         console.log('Fetched image blob:');
                // setDropedImage();
        // });
        // Blob {size: SIZE, type: 'image/png'}
    }, []);

    function getDroppedImage(event: any) {
        const link = event.target.value;
        console.log(link)
        if (link.length > 8) { // more regExp evaluation soon
            setDropedImage(link);
        } else return 0;
    }

    // data handlers

    function handle_Title(e: any) {
        if (!e) return
        e.preventDefault();
        const value = e.currentTarget.value;
        // alert(value)
        setEventData(previusData => { return { ...previusData, title: value }})
    }

    function handle_Location(e: any) {
        // alert(value)
        if (!e) return
        e.preventDefault();
        const value = e.currentTarget.value;
        setEventData(previusData => { return { ...previusData, location: value }})
    }

    function handle_Hostname(e: any) {
         // alert(value)
         if (!e) return
         e.preventDefault();
         const value = e.currentTarget.value;
         setEventData(previusData => { return { ...previusData, hostname: value }})
    }

    function handle_Description(e: any) {
         // alert(value)
         if (!e) return
         e.preventDefault();
         const value = e.currentTarget.value;
         setEventData(previusData => { return { ...previusData, description: value }})
    }

    function handle_Date(e: any) {
        if (!e) return
        e.preventDefault();
        const value = e.currentTarget.value;
        // alert(value)
        setEventData(previusData => { return { ...previusData, date: value }})
    }

    function handle_Paid(e: any) {
        if (!e) return
        const value = e.currentTarget.checked;
        // console.log(value)
        setEventData(previusData => { return { ...previusData, paid: value }})    // for bool value !
    }

    function handle_Ticketprice(e: any) {
        if (!e) return
        e.preventDefault();
        const value = e.currentTarget.value;
        // alert(value)
        setEventData(previusData => { return { ...previusData, ticketprice: value }})        
    }

    function handle_Catogory(e: any) {
        if(!e) return
        const value = e.currentTarget.value;
        setEventData(previusData => { return { ...previusData, catogory: value }})        
    }

    function handle_Submit(e: any) {
        if(!e) return
        e.preventDefault();
        console.log('submitting data..');
        // submit data.. to backend
        // set image thumbnail
        if (dropedImage && eventdata) eventdata.thumbnail = dropedImage;
        console.table(eventdata);
        post_event(eventdata).then(res => {
            if (res.ok) {
                console.log('data saved successfully!');
                router.push('/');
            }
            else console.log('something went wrong! in saving to DB ', res.statusText);
        })
    }

    return (
        <div className="flex items-center justify-center w-full min-h-screen pt-3 px-2 bg-slate-200 text-black dark:bg-black dark:text-white">

            <div className="flex flex-col items-center justify-center w-full sm:w-4/5 md:w-4/5 mx-2 px-4 py-8 bg-white text-black dark:bg-black dark:text-white rounded-3xl overflow-y-scroll shadow-xl">
                <h1 className="text-2xl font-bold capitalize">Add event</h1>
                <h1 className="capitalize text-xs text-center font-light mt-2 mb-2">already have event detail? <Link href="/profile">Scan poster</Link></h1>

            <form action={ (e) => handle_Submit(e) } className="w-full flex flex-col gap-2 items-center justify-center my-4 py-2 px-2">
                
                {/* IMAGE DROP */}
                <div className="flex flex-col gap-0.5 pt-4 items-center justify-center rounded-xl bg-zinc-300 dark:bg-zinc-900 placeholder-slate-600 w-full py-2 px-5 outline-none" >
                    <Image priority className="rounded-xl w-auto h-auto opacity-20" src={ dropedImage ? dropedImage : AddIcon} width={100} height={100} alt="event picture" />
                    <input onChange={ (event) => getDroppedImage(event) } className="bg-zinc-300 dark:bg-zinc-900 placeholder-slate-600 w-full focus:border-2 py-2 px-5 outline-none text-center rounded-full text-xs capitalize" type="text" placeholder="drop image or link" />
                </div>

                    
                {/* EVENT TITLE */}
                <input onChange={ (e)=> handle_Title(e)} className="bg-zinc-300 dark:bg-zinc-900 placeholder-slate-600 w-full focus:border-2 rounded-full py-2 px-5 outline-none" type="text" placeholder="event title" value={eventdata.title} />
                
                {/* EVENT HOST */}
                <input onChange={ (e)=> handle_Hostname(e)} className="bg-zinc-300 dark:bg-zinc-900 placeholder-slate-600 w-full focus:border-2 rounded-full py-2 px-5 outline-none" type="text" placeholder="host name" value={eventdata.hostname} />
                
                {/* EVENT DATE */}
                
                <div className="flex gap-1 w-full text-center">
                    <input onChange={ (e)=> handle_Date(e)} className="bg-zinc-300 dark:bg-zinc-900 placeholder-slate-600 w-1/2 focus:border-2 rounded-l-full py-2 px-5 outline-none border-none" type="date" defaultValue={ DateTime.now().toISODate() } />
                    <input onChange={ (e)=> console.log('handle event time input')} className="bg-zinc-300 dark:bg-zinc-900 placeholder-slate-600 w-1/2 focus:border-2 rounded-r-full py-2 px-5 outline-none border-none" type="time" defaultValue="12:00" />
                </div>

                {/* EVENT LOCATION */}
                <input onChange={ (e)=> handle_Location(e)} className="bg-zinc-300 dark:bg-zinc-900 placeholder-slate-600 w-full focus:border-2 rounded-full py-2 px-5 outline-none" type="text" placeholder="location" value={eventdata.location} />

                {/* EVENT PAID */}
                {/* <input onChange={ (e)=> handle_Paid(e)} className="mx-2 w-5" name="checkbox" type="checkbox" defaultChecked={ eventdata.paid } /> */}

                <span className="first-letter:capitalize w-4/5 text-xs text-left font-light mt-2 mb-2">This information will be displayed on the event title card!</span>

                <hr style={{ width: '80%', display: 'block', margin: '0.8rem auto' }} />
                
                <h1 className="text-xl text-center my-4 font-bold capitalize">Additional information</h1>

                {/* IMAGE;s DROP */}
                <div className="flex flex-col gap-0.5 pt-4 items-center justify-center rounded-xl bg-zinc-300 dark:bg-zinc-900 placeholder-slate-600 w-full py-2 px-5 outline-none" >
                    <Image className="rounded-xl w-auto h-auto opacity-20" src={ AddIcon} width={100} height={100} alt="event picture" />
                    <input className="bg-zinc-300 dark:bg-zinc-900 placeholder-slate-600 w-full focus:border-2 py-2 px-5 outline-none text-center rounded-full text-xs capitalize" type="text" placeholder="drop additional images or link" />
                </div>
                
                {/* EVENT DESCRIPTION */}
                <input onChange={ (e)=> handle_Description(e)} className="bg-zinc-300 dark:bg-zinc-900 placeholder-slate-600 w-full focus:border-2 rounded-full py-2 px-5 outline-none" type="text" placeholder="event description" value={eventdata.description} />
                
                {/* EVENT AMINITIES */}
                <input className="bg-zinc-300 dark:bg-zinc-900 placeholder-slate-600 w-full focus:border-2 rounded-full py-2 px-5 outline-none" type="text" placeholder="features / aminities" />

                {/* EVENT TYPE */}
                <div className="block bg-zinc-300 dark:bg-zinc-900 placeholder-slate-600 w-full focus:border-2 rounded-full py-2 px-5 outline-none">
                    <select onChange={ (e)=> handle_Catogory(e)} className="w-full text-left bg-zinc-300 dark:bg-zinc-900 placeholder-slate-600 rounded-md text-sm capitalize outline-none">
                        <option>music</option>
                        <option>dance</option>
                        <option>sports</option>
                        <option>arts</option>
                        <option>meets</option>
                    </select>
                </div>

                {/* TICKET PRICE */}
                <input onChange={ (e)=> handle_Ticketprice(e)} className="bg-zinc-300 dark:bg-zinc-900 placeholder-slate-600 w-full focus:border-2 rounded-full py-2 px-5 outline-none" name="ticketprice" type="number" placeholder="ticket price" value={eventdata.ticketprice} />

                {/* ADDITIONAL INFO */}
                <input className="bg-zinc-300 dark:bg-zinc-900 placeholder-slate-600 w-full focus:border-2 rounded-full py-2 px-5 outline-none" type="text" placeholder="Additional Info .." />

                <button type="submit" onClick={ (e)=> handle_Submit(e) } className="font-semibold capitalize w-1/2 bg-blue-950 text-white hover:bg-slate-700 rounded-full my-2 py-2 px-5 outline-none border-none">{ pending ? 'saving..' : 'save event' }</button>
                {
                    formerrors && (formerrors.map((err: string, i: number) => <span key={i} className="text-sm -m-1 first-letter:capitalize font-light text-red-400">{ err }</span>))
                }

            </form>
        </div>




            {/* <div className="flex my-8 flex-col relative rounded-xl bg-white w-full text-black p-2 overflow-hidden">
                
                
               
                <div className="flex items-center my-2 px-2">
                        <Image className="rounded-full mr-3" src={DummyImage} width={40} height={40} alt="host icon" />
                        
                    </div>

                <div className="px-2 pb-3">
                    
                </div>

                <div className="px-2 pb-3">
                    <label htmlFor="ticketprice">ticket price </label>
                </div>

                


            </div> */}

            
        </div>
    );
}