"use client"

import Modal from "@/components/modal/Modal";
import { useState } from "react";

export default function Test() {

    const [params, setParams] = useState(123)
    const [modal, setModal] = useState(false);
    const [result, setResult] = useState<any>([]);

    async function sendPUT(id: number) {
        let res = await fetch(`/api/test/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ data: { 'hello': 'This is from client side!' } }),
        })

        if (res) {
            setResult(res);
            console.log(res);
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full m-6 text-center">
            <h1 className="my-4 font-bold">Test</h1>

            { modal && <Modal text="catogory set successfully!" success={true} /> }
            
            <input type="number" onChange={ (event) => setParams(Number(event.currentTarget.value))} className="bg-slate-200 w-1/3 rounded-md outline-none border-none px-2 text-center" value={params} />
            <button onClick={ () => { sendPUT(params); } } className="rounded-mg bg-slate-300 p-2 my-4 mx-autu">test PUT reques!</button>
            <div>
                <h1 className="text-slate-400">result in console</h1>
                <div>
                    <span>{ result }</span>
                </div>

            <button className="my-4 bg-green-500 text-white rounded p-2" onClick={()=> setModal(!modal)}>test modal</button>

            </div>
        </div>
    )
}