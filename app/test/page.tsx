"use client"

import { useState } from "react";

export default function Test() {

    const [params, setParams] = useState(123)
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
            <input type="number" onChange={ (event) => setParams(Number(event.currentTarget.value))} className="bg-slate-200 w-1/3 rounded-md outline-none border-none px-2 text-center" value={params} />
            <button onClick={ () => { sendPUT(params); } } className="rounded-mg bg-slate-300 p-2 my-4 mx-autu">test PUT reques!</button>
            <div>
                <h1 className="text-slate-400">result in console</h1>
                <div>
                    {
                        // result ? result.map((item: any/) => item.value) : 'result here..'
                    }
                </div>
            </div>
        </div>
    )
}