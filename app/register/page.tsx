"use client";

import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPass] = useState('')
    const [repassword, setRePass] = useState('')
    const [formerrors, setFormErrors] = useState([]);

    function handleFirstname(e: any) {
        e.preventDefault();
        const value = e.currentTarget.value;
        setFirstname(value);
    }

    function handleLastname(e: any) {
        e.preventDefault();
        const value = e.currentTarget.value;
        setLastname(value);
    }

    function handleEmail(e: any) {
        e.preventDefault();
        const value = e.currentTarget.value;
        setEmail(value);
    }

    function handlePassword(e: any) {
        e.preventDefault();
        const value = e.currentTarget.value;
        setPass(value);
    }

    function handleRePass(e: any) {
        e.preventDefault();
        const value = e.currentTarget.value;
        setRePass(value);
    }

    async function handleSubmit() {

        // data validation
        let errors = []; // empty array for errs
        const emailtest = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const username = `${firstname} ${lastname}`;
        // fill array if errs
        if (!username) errors.push("username is required!");
        if (!email) errors.push("email is required!")
        if (password.length < 8) errors.push("password is short!")
        if (!password) errors.push("password is required!")
        if (password !== repassword) errors.push("passwords does not match!");
        if (emailtest.test(email)) errors.push("Enter valid E-mail!");
        
        
        const data = {
            username: username,
            email: email,
            password: password,
        }

        // post to backend if everything fine
        if (data && errors.length === 0) {
            // api call
            console.table(data);
            console.log('submiting to backend!!')

            try {
                const res = await fetch("/api/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username,
                        email,
                        password
                    })
                });

                if (res.status === 400) {
                    errors.push("E-mail is already registered!");
                }
            } catch (error) {
                console.log('error in saving data: ', error);
            }

        }

        else {
            console.log(errors);
        }

    }

    return (
        <div className="flex items-center justify-center w-full h-screen pt-3 px-2">

            <div className="flex flex-col items-center justify-center w-full sm:w-4/5 md:w-4/5 mx-2 px-4 py-8 bg-black text-white rounded-3xl">
                <h1 className="text-2xl font-bold capitalize">Create account</h1>
                <h1 className="capitalize text-xs text-center font-light mt-2 mb-2">already have account? <Link href="/profile">Sign in</Link></h1>

                <form action={ () => handleSubmit() } className="w-full flex flex-col gap-2 items-center justify-center my-4 py-2 px-2">
                    <div className="flex gap-1">
                        <input onChange={ handleFirstname } className="bg-zinc-900 w-1/2 focus:border-2 rounded-l-full py-2 px-5 outline-none" type="text" placeholder="First Name" value={firstname} />
                        <input onChange={ handleLastname } className="bg-zinc-900 w-1/2 focus:border-2 rounded-r-full py-2 px-5 outline-none" type="text" placeholder="Last Name" value={lastname} />
                    </div>
                    <input onChange={ handleEmail } className="bg-zinc-900 w-full focus:border-2 rounded-full py-2 px-5 outline-none" type="email" placeholder="Email" value={email} />
                    <input onChange={ handlePassword} className="bg-zinc-900 w-full focus:border-2 rounded-full py-2 px-5 outline-none" type="password" placeholder="Password" value={password} />
                    <input onChange={ handleRePass } className="bg-zinc-900 w-full focus:border-2 rounded-full py-2 px-5 outline-none" type="password" placeholder="Confirm password" value={repassword} />
                    <button type="submit" className="capitalize w-1/2 bg-blue-900 hover:bg-blue-950 rounded-full my-2 py-2 px-5 outline-none border-none">sign up</button>
                </form>
            </div>

        </div>
    )
}