"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import validateEmail from "@/utils/validateMail";
import TopNavbar from "@/components/topnavbar/TopNavbar";
import { useFormStatus } from "react-dom";
import BottomNavBar from "@/components/bottomnavbar/BottomNavBar";

export default function RegisterPage() {

    const router = useRouter();
    const { pending } = useFormStatus();
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
                    setFormErrors([" "]); // clear errors
                    localStorage.setItem('authstatus', email);
                    router.push("/profile");
                } 
            } catch (error) {
                console.log('error in saving data: ', error);
                setFormErrors(["error in saving data"]);
            }

        }

        else {
            console.log(errors);
            setFormErrors(errors);
        }

    }

    return (
        <div className="flex flex-col items-center bg-evento-white text-black dark:bg-evento-black dark:text-white transition">
        <TopNavbar />
        <div className="flex items-center justify-center w-full h-auto pt-3 px-2 mt-16">
            <div className="flex flex-col items-center justify-center w-full sm:w-4/5 md:w-4/5 mx-2 px-4 py-8 bg-evento-white text-black dark:bg-black dark:text-white rounded-3xl shadow-evento-shadow">
                <h1 className="text-2xl font-bold capitalize">Create account</h1>
                <h1 className="capitalize text-xs text-center font-light mt-2 mb-2">already have account? <Link className="text-blue-500 hover:underline" href="/login">Log in</Link></h1>
 
                <form action={ () => handleSubmit() } className="w-full flex flex-col gap-2 items-center justify-center my-4 py-2 px-2">
                    <div className="flex gap-1">
                        <input onChange={ handleFirstname } className="bg-evento-white border-2 border-evento-border-white dark:border-evento-black dark:bg-evento-black w-1/2 rounded-l-lg py-3 px-5 outline-none focus:border-evento-black dark:focus:border-evento-white placeholder-slate-500" type="text" placeholder="First Name" value={firstname} />
                        <input onChange={ handleLastname } className="bg-evento-white border-2 border-evento-border-white dark:border-evento-black dark:bg-evento-black w-1/2 rounded-r-lg py-3 px-5 outline-none focus:border-evento-black dark:focus:border-evento-white placeholder-slate-500" type="text" placeholder="Last Name" value={lastname} />
                    </div>
                    <input onChange={ handleEmail } className="bg-evento-white border-2 border-evento-border-white dark:border-evento-black dark:bg-evento-black w-full rounded-lg py-3 px-5 outline-none focus:border-evento-black dark:focus:border-evento-white placeholder-slate-500" type="email" placeholder="Email" value={email} />
                    <input onChange={ handlePassword} className="bg-evento-white border-2 border-evento-border-white dark:border-evento-black dark:bg-evento-black w-full rounded-lg py-3 px-5 outline-none focus:border-evento-black dark:focus:border-evento-white placeholder-slate-500" type="password" placeholder="Password" value={password} />
                    <input onChange={ handleRePass } className="bg-evento-white border-2 border-evento-border-white dark:border-evento-black dark:bg-evento-black w-full rounded-lg py-3 px-5 outline-none focus:border-evento-black dark:focus:border-evento-white placeholder-slate-500" type="password" placeholder="Confirm password" value={repassword} />
                    <button type="submit" className="capitalize w-1/2 bg-evento-black dark:bg-evento-white dark:text-black text-white rounded-lg mt-6 mb-2 py-3 px-5 outline-none border-none">{ pending ? 'Submitting' : 'Sign Up' }</button>
                    {
                        formerrors && (formerrors.map((err: string, i: number) =>
                            <span key={i} className="text-xs first-letter:capitalize font-light text-red-400">{ err }</span>))
                                // :
                            // creatinguser && <span className="text-sm -m-1 first-letter:capitalize font-light text-green-400">creating user...</span>
                    }
                </form>
            </div>
            <BottomNavBar active="Profile" />
        </div>
        </div>
    )
}