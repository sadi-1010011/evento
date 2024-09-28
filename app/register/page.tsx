"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import validateEmail from "@/utils/validateMail";

export default function RegisterPage() {

    const router = useRouter();
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPass] = useState('')
    const [repassword, setRePass] = useState('')
    const [formerrors, setFormErrors] = useState<any>([]);

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
        const username = `${firstname} ${lastname}`.replaceAll(' ', '');
        // fill array if errs
        if (!username) errors.push("username is required!");
        if (!email) errors.push("email is required!")
        if (password.length < 8) errors.push("password is short!")
        if (!password || !repassword) errors.push("password is required!")
        if (password !== repassword) errors.push("passwords does not match!");
        if (validateEmail(email)) { console.log('email regex test passed') } // errors.push("Enter valid E-mail!");
                
        const data = {
            username: username,
            email: email,
            password: password,
        }

        // post to backend if everything fine
        if (data && errors.length === 0) {
            // api call
            console.log('submiting user data to backend!!')

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
                    errors.push("E-mail is already registered!")
                    setFormErrors(errors);
                }

                if (res.status === 200) {
                    setFormErrors('');
                    router.push("/profile");
                } 
            } catch (error) {
                console.log('error in saving data: ', error);
                setFormErrors('');
            }

        }

        else {
            console.log(errors);
            setFormErrors(errors);
        }

    }

    return (
        <div className="flex items-center justify-center w-full h-screen pt-3 px-2">

            <div className="flex flex-col items-center justify-center w-full sm:w-4/5 md:w-4/5 mx-2 px-4 py-8 bg-white text-black rounded-3xl shadow-2xl">
                <h1 className="text-2xl font-bold capitalize">Create account</h1>
                <h1 className="capitalize text-xs text-center font-light mt-2 mb-2">already have account? <Link className="text-blue-500 hover:underline" href="/profile">Log in</Link></h1>

                <form action={ () => handleSubmit() } className="w-full flex flex-col gap-2 items-center justify-center my-4 py-2 px-2">
                    <div className="flex gap-1">
                        <input onChange={ handleFirstname } className="bg-zinc-200 w-1/2 focus:border-2 rounded-l-full py-2 px-5 outline-none" type="text" placeholder="First Name" value={firstname} />
                        <input onChange={ handleLastname } className="bg-zinc-200 w-1/2 focus:border-2 rounded-r-full py-2 px-5 outline-none" type="text" placeholder="Last Name" value={lastname} />
                    </div>
                    <input onChange={ handleEmail } className="bg-zinc-200 w-full focus:border-2 rounded-full py-2 px-5 outline-none" type="email" placeholder="Email" value={email} />
                    <input onChange={ handlePassword} className="bg-zinc-200 w-full focus:border-2 rounded-full py-2 px-5 outline-none" type="password" placeholder="Password" value={password} />
                    <input onChange={ handleRePass } className="bg-zinc-200 w-full focus:border-2 rounded-full py-2 px-5 outline-none" type="password" placeholder="Confirm password" value={repassword} />
                    <button type="submit" className="capitalize w-1/2 bg-blue-950 text-white hover:bg-slate-700 rounded-full my-2 py-2 px-5 outline-none border-none">sign up</button>
                    {
                        formerrors && (formerrors.map((err: string, i: number) =>
                            <span key={i} className="text-xs -m-1 first-letter:capitalize font-light text-red-400">{ err }</span>))
                                // :
                            // creatinguser && <span className="text-sm -m-1 first-letter:capitalize font-light text-green-400">creating user...</span>
                    }
                </form>
            </div>

        </div>
    )
}