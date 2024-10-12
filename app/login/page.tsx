"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import validateEmail from "@/utils/validateMail";
import { userLogin } from "../serverActions/userLogin";
import { useEffect, useState } from "react";
import BottomNavBar from "@/components/bottomnavbar/BottomNavBar";
import TopNavbar from "@/components/topnavbar/TopNavbar";
import dynamic from "next/dynamic";

export default function LoginPage() {

    const router = useRouter();
    const [pending, setPending] = useState(false);
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPass] = useState('')
    const [formerrors, setFormErrors] = useState<any>([]);

    // Theme auto setting!
    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark')
			document.documentElement.classList.add('dark');
        else 
            document.documentElement.classList.remove('dark');
    }, []);

    // function handleUsername(e: any) {
    //     e.preventDefault();
    //     const value = e.currentTarget.value;
    //     setUsername(value);
    // }


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


    async function handleSubmit() {

        setPending(true);
        // data validation
        let errors = []; // empty array for errs
        // fill array if errs
        // if (!username) errors.push("username is required!");
        if (!email) errors.push("email is required!")
        if (!password) errors.push("password is required!")
        if (password.length < 8) errors.push("password is short!")
        if (validateEmail(email)) { console.log('email regex test passed') } // errors.push("Enter valid E-mail!");
                
        const data = {
            username: username,
            email: email,
            password: password,
        }

        // login if everything fine
        if (data && errors.length === 0) {
            // api call
            console.log('submiting login data to backend!!')

            // login with data
            // userLogin(data);
            const res = await userLogin(data);
            // error string
            if (typeof res === 'string') {
                errors.push(res);
                setFormErrors(errors);
            } 
            // user data set in cookies
            else {
                // SUCCESS LOGIN!
                setFormErrors([""]);
                router.replace("/profile");
            }
        }

        else {
            // console.log(errors);
            setFormErrors(errors);
        }

    }

    return (
        <div className="flex flex-col items-center bg-evento-white text-black dark:bg-evento-black dark:text-white transition">
        
        <TopNavbar />
        
        <div className="flex items-center justify-center w-full h-auto pt-2 px-2 mt-20">

            <div className="flex flex-col items-center justify-center w-full sm:w-4/5 md:w-4/5 mx-2 px-4 py-8 bg-evento-white text-black dark:bg-black dark:text-white rounded-3xl shadow-evento-shadow border-slate-100">
                <h1 className="text-2xl font-bold capitalize">Evento login</h1>
                <h1 className="capitalize text-xs text-center font-light mt-2">Dont have an account? <Link className="text-blue-500 hover:underline" href="/register">register</Link></h1>

                <form action={ async () => handleSubmit() } className="w-full flex flex-col gap-2 items-center justify-center my-4 py-2 px-2">
                    {/* <input onChange={ handleUsername } className="bg-evento-white border-evento-border-white w-full focus:border-2 rounded-full py-2 px-5 outline-none" type="text" placeholder="User Name" value={username} /> */}
                    
                    {/* EMAIL, PASSWORD */}
                    <input onChange={ handleEmail } className="bg-evento-white border-2 border-evento-border-white focus:border-evento-black dark:focus:border-evento-white dark:border-evento-border-black dark:bg-evento-black w-full rounded-lg py-2 px-5 outline-none" type="email" placeholder="Email" value={email} />
                    <input onChange={ handlePassword} className="bg-evento-white border-2 border-evento-border-white focus:border-evento-black dark:focus:border-evento-white dark:border-evento-border-black dark:bg-evento-black w-full rounded-lg py-2 px-5 outline-none" type="password" placeholder="Password" value={password} autoComplete="true" />
                    
                    <h1 className="capitalize text-xs text-center font-light mt-4">forgot password? <Link className="text-blue-500 hover:underline" href="/profile">recover</Link></h1>
                    
                    <button type="submit" className="capitalize w-1/2 bg-evento-black text-white dark:bg-evento-white dark:text-black hover:bg-slate-700 rounded-lg my-2 py-2 px-5 outline-none border-none" disabled={pending}>{ (pending) ? 'logging..' : 'Login' }</button>
                    {
                        formerrors && (formerrors.map((err: string, i: number) =>
                            <span key={i} className="text-xs -m-1 first-letter:capitalize font-light text-red-400">{ err }</span>))
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