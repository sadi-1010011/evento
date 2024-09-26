"use client"

import Image from "next/image";
import DummyImage from "@/assets/evento.jpeg";
import AddIcon from "@/assets/icons/plus.png";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { post_event } from "../(fetchAPI)/restAPI";
import { DateTime } from "luxon";

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
        <div className="flex items-center justify-center w-full h-screen pt-3 px-2">

            <div className="flex flex-col items-center justify-center w-full sm:w-4/5 md:w-4/5 mx-2 px-4 py-8 bg-black text-white rounded-3xl">
                <h1 className="text-2xl font-bold capitalize">Add event</h1>
                <h1 className="capitalize text-xs text-center font-light mt-2 mb-2">already have event detail? <Link href="/profile">Scan poster</Link></h1>

            <form action={ (e) => handle_Submit(e) } className="w-full flex flex-col gap-2 items-center justify-center my-4 py-2 px-2">
                
                {/* IMAGE DROP */}
                <div className="flex flex-col gap-0.5 pt-4 items-center justify-center rounded-xl bg-zinc-900 w-full py-2 px-5 outline-none" >
                    {/* <span className="capitalize text-xs text-center font-light mt-2 mb-2">drop image</span> */}
                    <Image priority className="rounded-xl w-auto h-auto opacity-20" src={ dropedImage ? dropedImage : AddIcon} width={100} height={100} alt="event picture" />
                    <input onChange={ (event) => getDroppedImage(event) } className="bg-zinc-900 w-full focus:border-2 py-2 px-5 outline-none text-center rounded-full text-xs capitalize" type="text" placeholder="drop image or link" />
                </div>

                <div className="flex gap-1">
                    
                    {/* EVENT TITLE */}
                    <input onChange={ (e)=> handle_Title(e)} className="bg-zinc-900 w-1/2 focus:border-2 rounded-l-full py-2 px-5 outline-none" type="text" placeholder="event title" value={eventdata.title} />
                    
                    {/* EVENT LOCATION */}
                    <input onChange={ (e)=> handle_Location(e)} className="bg-zinc-900 w-1/2 focus:border-2 rounded-r-full py-2 px-5 outline-none" type="text" placeholder="location" value={eventdata.location} />
                </div>
                
                {/* EVENT HOST */}
                <input onChange={ (e)=> handle_Hostname(e)} className="bg-zinc-900 w-full focus:border-2 rounded-full py-2 px-5 outline-none" type="text" placeholder="host name" value={eventdata.hostname} />
                
                {/* EVENT DESCRIPTION */}
                <input onChange={ (e)=> handle_Description(e)} className="bg-zinc-900 w-full focus:border-2 rounded-full py-2 px-5 outline-none" type="text" placeholder="event description" value={eventdata.description} />
                
                {/* EVENT DATE */}
                {/* <span className="capitalize text-xs text-center font-light mt-2 mb-2">Event date</span> */}
                <input onChange={ (e)=> handle_Date(e)} className="bg-zinc-900 w-full focus:border-2 rounded-full py-2 px-5 outline-none border-none" type="date" />

                {/* EVENT PAID */}
                {/* <label htmlFor="checkbox">paid event</label>
                <input onChange={ (e)=> handle_Paid(e)} className="mx-2 w-5" name="checkbox" type="checkbox" defaultChecked={ eventdata.paid } /> */}

                {/* TICKET PRICE */}
                <input onChange={ (e)=> handle_Ticketprice(e)} className="bg-zinc-900 w-full focus:border-2 rounded-full py-2 px-5 outline-none" name="ticketprice" type="number" placeholder="ticket price" value={eventdata.ticketprice} />

                {/* EVENT TYPE */}
                <div className="block bg-zinc-900 w-full focus:border-2 rounded-full py-2 px-5 outline-none">
                    <select onChange={ (e)=> handle_Catogory(e)} className="p-2 w-full text-center bg-zinc-900 rounded-md text-sm capitalize">
                        <option>music</option>
                        <option>dance</option>
                        <option>sports</option>
                        <option>arts</option>
                        <option>meets</option>
                    </select>
                </div>


                <button type="submit" onClick={ (e)=> handle_Submit(e) } className="font-semibold capitalize w-1/2 bg-blue-900 hover:bg-blue-950 rounded-full my-2 py-2 px-5 outline-none border-none">save event</button>
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

            {/* <div className="m-6 text-center">
                <Link href="/events">go Back</Link>
            </div> */}
        </div>
    );
}