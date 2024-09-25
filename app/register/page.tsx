"use client";

import Link from "next/link";

export default function RegisterPage() {

    function handleSubmit() {
        alert('api under construction!')
    }
    return (
        <div className="flex items-center justify-center w-full h-screen pt-3 px-4">

            <div className="flex flex-col items-center justify-center w-4/5 px-6 py-8 bg-black text-white rounded-3xl">
                <h1 className="text-2xl font-bold capitalize">Create account</h1>
                <h1 className="capitalize text-xs text-center font-light mt-2 mb-2">already have account? <Link href="/profile">Sign in</Link></h1>

                <form action={ () => handleSubmit() } className="w-full flex flex-col gap-2 items-center justify-center my-4 py-2 px-2">
                    <div className="flex gap-1">
                        <input className="bg-zinc-900 w-1/2 focus:border-2 rounded-l-full py-2 px-5 outline-none" type="text" placeholder="First Name" />
                        <input className="bg-zinc-900 w-1/2 focus:border-2 rounded-r-full py-2 px-5 outline-none" type="text" placeholder="Last Name" />
                    </div>
                    <input className="bg-zinc-900 w-full focus:border-2 rounded-full py-2 px-5 outline-none" type="email" placeholder="Email" />
                    <input className="bg-zinc-900 w-full focus:border-2 rounded-full py-2 px-5 outline-none" type="password" placeholder="Password" />
                    <input className="bg-zinc-900 w-full focus:border-2 rounded-full py-2 px-5 outline-none" type="password" placeholder="Confirm password" />
                    <button type="submit" className="capitalize w-1/2 bg-blue-900 hover:bg-blue-950 rounded-full my-2 py-2 px-5 outline-none border-none">sign up</button>
                </form>
            </div>

        </div>
    )
}