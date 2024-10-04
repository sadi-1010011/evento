"use client"

import Image from "next/image";
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
        ticketlink: '', // only if ticket price
        thumbnail: '',
        paid: false, // default to free event
        date: DateTime.now().toFormat('ff') // event date
    });
    const [dropedImage, setDropedImage] = useState('');
    const [formerrors, setFormErrors] = useState<any>([]);
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
        // console.log(link)
        if (link.length > 8) { // more regExp evaluation soon
            setDropedImage(link);
        }// else setFormErrors(["Drop image or link!"]);
    }

    // data handlers

    function handle_Title(e: any) {
        if (!e) return
        e.preventDefault();
        const value = e.currentTarget.value;
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
        setEventData(previusData => { return { ...previusData, ticketprice: value }})        
    }

    function handle_TicketLink(e: any) {
        if (!e) return
        e.preventDefault();
        const value = e.currentTarget.value;
        setEventData(previusData => { return { ...previusData, ticketlink: value }})        
    }

    function handle_Catogory(e: any) {
        if(!e) return
        const value = e.currentTarget.value;
        setEventData(previusData => { return { ...previusData, catogory: value }})        
    }

    function handle_Submit(e: any) {
        if(!e) return
        e.preventDefault();
        let errors = [];
        console.log('validatig form..');
        
        // form validation!
        if (!eventdata.title) errors.push("Title is required!");
        if (!eventdata.location) errors.push("Location is required!");
        if (!eventdata.hostname) errors.push("Host name is required!");
        if (!eventdata.description) errors.push("Description is required!");
        if (!eventdata.date) errors.push("Date is required!");
        // if (!eventdata.ticketprice) 
        
        // set image thumbnail
        if (dropedImage && eventdata) eventdata.thumbnail = dropedImage;
        // console.table(eventdata);
        
        if (errors.length) setFormErrors(errors);

        // submit data.. to backend only if 0 errors
        else 
            post_event(eventdata).then(res => {
                if (res.ok) {
                    console.log('data saved successfully!');
                    router.push('/');
                }
                else console.log('something went wrong! in saving to DB ', res.statusText);
            })
        // otherwise show err!
        // else setFormErrors(errors);

    }
    
    return (
        <div className="flex items-center justify-center w-full min-h-screen py-12 px-2 bg-evento-white text-black dark:bg-evento-black dark:text-white">

            <div className="flex flex-col items-center justify-center w-full sm:w-4/5 md:w-4/5 mx-2 px-4 py-8 shadow-evento-shadow bg-evento-white text-black dark:bg-black dark:text-white rounded-3xl overflow-y-scroll">
                <h1 className="text-2xl font-bold capitalize">Add event</h1>
                <h1 className="capitalize text-xs text-center font-light mt-2 mb-2">already have event detail? <Link href="/profile">Scan poster</Link></h1>

            <form action={ (e) => handle_Submit(e) } className="w-full flex flex-col gap-2 items-center justify-center my-4 py-2 px-2">
                
                {/* IMAGE DROP */}
                <div className="flex flex-col gap-0.5 pt-4 items-center justify-center rounded-xl bg-evento-white border-2 border-evento-border-white dark:border-evento-border-black dark:bg-evento-black placeholder-slate-500 w-full py-2 px-5 outline-none" >
                    <Image priority className="rounded-xl w-auto h-auto opacity-20" src={ dropedImage ? dropedImage : AddIcon} width={100} height={100} alt="event picture" />
                    <input onChange={ (event) => getDroppedImage(event) } className="bg-evento-white dark:bg-evento-black w-full focus:border-2 py-2 px-5 outline-none text-center rounded-lg focus:border-evento-black text-xs capitalize" type="text" placeholder="drop image or link" />
                </div>

                    
                {/* EVENT TITLE */}
                <input onChange={ (e)=> handle_Title(e)} className="bg-evento-white border-2 border-evento-border-white dark:border-evento-border-black dark:bg-evento-black placeholder-slate-500 w-full focus:border-2 rounded-lg focus:border-evento-black py-3 px-5 outline-none" type="text" placeholder="event title" value={eventdata.title} />
                
                {/* EVENT HOST */}
                <input onChange={ (e)=> handle_Hostname(e)} className="bg-evento-white border-2 border-evento-border-white dark:border-evento-border-black dark:bg-evento-black placeholder-slate-500 w-full focus:border-2 rounded-lg focus:border-evento-black py-3 px-5 outline-none" type="text" placeholder="host name" value={eventdata.hostname} />
                
                {/* EVENT DATE */}
                
                <div className="flex gap-1 w-full text-center">
                    <input onChange={ (e)=> handle_Date(e)} className="bg-evento-white border-2 border-evento-border-white dark:border-evento-border-black dark:bg-evento-black placeholder-slate-500 w-1/2 focus:border-2 rounded-l-full py-3 px-5 outline-none border-none" type="date" defaultValue={ DateTime.now().toISODate() } />
                    <input onChange={ (e)=> console.log('handle event time input')} className="bg-evento-white border-2 border-evento-border-white dark:border-evento-border-black dark:bg-evento-black placeholder-slate-500 w-1/2 focus:border-2 rounded-r-full py-3 px-5 outline-none border-none" type="time" defaultValue="12:00" />
                </div>

                {/* EVENT LOCATION */}
                <input onChange={ (e)=> handle_Location(e)} className="bg-evento-white border-2 border-evento-border-white dark:border-evento-border-black dark:bg-evento-black placeholder-slate-500 w-full focus:border-2 rounded-lg focus:border-evento-black py-3 px-5 outline-none" type="text" placeholder="location" value={eventdata.location} />

                {/* EVENT PAID */}
                {/* <input onChange={ (e)=> handle_Paid(e)} className="mx-2 w-5" name="checkbox" type="checkbox" defaultChecked={ eventdata.paid } /> */}

                <span className="first-letter:capitalize w-4/5 text-xs text-left font-light mt-2 mb-2">This information will be displayed on the event title card!</span>

                <hr style={{ width: '80%', display: 'block', margin: '0.8rem auto' }} />
                
                <h1 className="text-xl text-center my-4 font-bold capitalize">Additional information</h1>

                {/* IMAGE;s DROP */}
                <div className="flex flex-col gap-0.5 pt-4 items-center justify-center rounded-xl bg-evento-white border-2 border-evento-border-white dark:border-evento-border-black dark:bg-evento-black placeholder-slate-500 w-full py-2 px-5 outline-none" >
                    <Image className="rounded-xl w-auto h-auto opacity-20" src={ AddIcon} width={100} height={100} alt="event picture" />
                    <input className="bg-evento-white dark:bg-evento-black placeholder-slate-500 w-full focus:border-2 py-3 px-5 outline-none text-center rounded-lg focus:border-evento-black text-xs capitalize" type="text" placeholder="drop additional images or link" />
                </div>
                
                {/* EVENT DESCRIPTION */}
                <input onChange={ (e)=> handle_Description(e)} className="bg-evento-white border-2 border-evento-border-white dark:border-evento-border-black dark:bg-evento-black placeholder-slate-500 w-full focus:border-2 rounded-lg focus:border-evento-black py-3 px-5 outline-none" type="text" placeholder="event description" value={eventdata.description} />
                
                {/* EVENT AMINITIES */}
                <input className="bg-evento-white border-2 border-evento-border-white dark:border-evento-border-black dark:bg-evento-black placeholder-slate-500 w-full focus:border-2 rounded-lg focus:border-evento-black py-3 px-5 outline-none" type="text" placeholder="features / aminities" />

                {/* EVENT TYPE */}
                <div className="block bg-evento-white border-2 border-evento-border-white dark:border-evento-border-black dark:bg-evento-black placeholder-slate-500 w-full focus:border-2 rounded-lg focus:border-evento-black py-3 px-5 outline-none">
                    <select onChange={ (e)=> handle_Catogory(e)} className="w-full text-left bg-evento-white dark:bg-evento-black placeholder-slate-500 rounded-md text-sm capitalize outline-none">
                        <option>music</option>
                        <option>dance</option>
                        <option>sports</option>
                        <option>arts</option>
                        <option>meets</option>
                    </select>
                </div>

                {/* TICKET PRICE */}
                <input onChange={ (e)=> handle_Ticketprice(e)} className="bg-evento-white border-2 border-evento-border-white dark:border-evento-border-black dark:bg-evento-black placeholder-slate-500 w-full focus:border-2 rounded-lg focus:border-evento-black py-3 px-5 outline-none" name="ticketprice" type="number" placeholder="ticket price" value={eventdata.ticketprice} />

                {/* PAYMENT LINK */}
                { eventdata.ticketprice  && <input onChange={ (e)=> handle_TicketLink(e)} className="bg-evento-white border-2 border-evento-border-white dark:border-evento-border-black dark:bg-evento-black placeholder-slate-500 w-full focus:border-2 rounded-lg focus:border-evento-black py-3 px-5 outline-none" name="ticketlink" type="text" placeholder="Payment Link" value={eventdata.ticketlink} /> }

                {/* ADDITIONAL INFO */}
                <input className="bg-evento-white border-2 border-evento-border-white dark:border-evento-border-black dark:bg-evento-black placeholder-slate-500 w-full focus:border-2 rounded-lg focus:border-evento-black py-3 px-5 outline-none" type="text" placeholder="Additional Info .." />

                <button type="submit" onClick={ (e)=> handle_Submit(e) } className="font-semibold capitalize w-1/2 bg-evento-black text-white dark:bg-evento-white dark:text-black rounded-lg focus:border-evento-black mt-6 mb-2 py-3 px-5 outline-none border-none">{'save event' }</button>
                {
                    formerrors && (formerrors.map((err: string, i: number) => <span key={i} className="text-sm -m-1 first-letter:capitalize font-light text-red-400">{ err }</span>))
                }

            </form>
        </div>
           
        </div>
    );
}