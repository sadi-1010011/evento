"use client"

import Image from "next/image";
import DummyImage from "@/assets/evento.jpeg";
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
        location: 'calicut',
        description: '',
        ticketprice: 0,
        thumbnail: '',
        paid: false, // default to free event
        date: DateTime.now().toFormat('ff') // event date
    });
    const [dropedImage, setDropedImage] = useState('');
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
        <div className="min-h-screen w-full my-2 pt-3 px-6">
            <h1 className="text-center text-xl capitalize font-semibold">add event</h1>
            <div className="flex my-8 flex-col relative rounded-xl bg-white w-full text-black p-2 overflow-hidden">
                {/* IMAGE DROP */}
                <div className="absolute bg-white text-slate-400 text-sm capitalize font-semibold cursor-copy shadow-md m-5 rounded-xl" >
                    <input onChange={ (event) => getDroppedImage(event) } className="capitalize inline-block p-5 rounded-xl font-bold placeholder-slate-500 outline-none border-none" type="text" placeholder="drop image link" />
                </div>
                <span className="absolute right-8 bg-red-600 text-white text-sm cursor-not-allowed font-semibold px-2 shadow-md m-5 rounded-xl" >no image</span>
                <Image priority className="rounded-xl w-full h-auto" src={ dropedImage ? dropedImage : DummyImage} width={100} height={100} alt="event picture" />
                <div className="flex flex-row justify-items-start mt-3 px-2 overflow-hidden">
                    {/* EVENT TITLE */}
                    <input onChange={ (e)=> handle_Title(e)} className="capitalize font-bold placeholder-black outline-none border-none" type="text" placeholder="event title," value={ eventdata.title } />
                    {/* EVENT LOCATION */}
                    <input onChange={ (e)=> handle_Location(e)} className="capitalize font-bold placeholder-black outline-none border-none" type="text" placeholder="location.." value={ eventdata.location } />
                </div>
                <div className="flex items-center my-2 px-2">
                        <Image className="rounded-full mr-3" src={DummyImage} width={40} height={40} alt="host icon" />
                        {/* EVENT HOST */}
                        <input onChange={ (e)=> handle_Hostname(e)} className="capitalize font-bold placeholder-black outline-none border-none" type="text" placeholder="Host name.." value={ eventdata.hostname } />
                    </div>
                {/* EVENT DESCRIPTION */}
                <input onChange={ (e)=> handle_Description(e)} className="px-2 capitalize py-3 placeholder-black outline-none border-none" type="text" placeholder="event description.." value={ eventdata.description } />

                <div className="px-2 pb-2">
                    <span>Event date : </span>
                    {/* EVENT DATE */}
                    <input onChange={ (e)=> handle_Date(e)} type="date" className="outline-none border-none" />
                </div>

                <div className="px-2 pb-3">
                    <label htmlFor="checkbox">paid event</label>
                    {/* EVENT PAID */}
                    <input onChange={ (e)=> handle_Paid(e)} className="mx-2 w-5" name="checkbox" type="checkbox" defaultChecked={ eventdata.paid } />
                </div>

                <div className="px-2 pb-3">
                    <label htmlFor="ticketprice">ticket price </label>
                    {/* TICKET PRICE */}
                    <input onChange={ (e)=> handle_Ticketprice(e)} className="w-1/3 mx-2 border-4 rounded-md text-center" name="ticketprice" type="number" value={ eventdata.ticketprice} />
                </div>

                <div className="block">
                    <select onChange={ (e)=> handle_Catogory(e)} className="p-2 w-full text-center bg-slate-200 rounded-md text-sm capitalize">
                        <option>music</option>
                        <option>dance</option>
                        <option>sports</option>
                        <option>arts</option>
                        <option>meets</option>
                    </select>
                </div>

                <button onClick={ (e)=> handle_Submit(e) } className="mt-2 mb-1 p-2 capitalize font-extrabold text-black bg-green-400 rounded-md">save</button>

            </div>

            <div className="m-6 text-center">
                <Link href="/events">go Back</Link>
            </div>
        </div>
    );
}