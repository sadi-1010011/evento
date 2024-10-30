"use client"

import BottomNavBar from "@/components/bottomnavbar/BottomNavBar";
import { useEffect, useState } from "react";
import sendFeedbackAction from "../serverActions/user/sendFeedbackAction";

export default function FeedbackPage() {

    const minFeedbacknCharacters = 10;
    const heightLimit = 350;
    const [feedback, setFeedback] = useState('');
    const [user, setUser] = useState<string>('');

    // USER LOGIN?
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) setUser(String(user));
    }, []);

    function handleFeedback(e: any) {
        const feedbackbox = e.currentTarget;
        const value = feedbackbox.value;
        e.preventDefault();
        if (!value) setFeedback('');
        // AUTO RESIZE TEXTBOX
        feedbackbox.style.height = "";
        feedbackbox.style.height = Math.min(feedbackbox.scrollHeight, heightLimit) + "px";

        setFeedback(value);
    }

    function submitFeedback() {
        console.log('feedback: ', feedback);
        if (!feedback || feedback.length < minFeedbacknCharacters) { alert('feedback must be at least 10 characters!'); return }

        user ? sendFeedbackAction(feedback, user).then(res => {
                if (res) {
                    alert('feedback submitted successfully!');
                    setFeedback('');
                }
                else alert('oops something went wrong! check connection');
            }
        ) :
        sendFeedbackAction(feedback).then(res => {
            if (res) {
                alert('feedback submitted successfully!');
                setFeedback('');
            }
            else alert('oops something went wrong! check connection');
        }
    )
    }
    
    return (
        <div className="w-full h-screen pt-2 bg-evento-white text-black dark:bg-evento-black dark:text-white text-center">
            <h1 className="w-full text-left text-3xl capitalize font-medium pl-6 pt-6 pb-4">Feedback</h1>

            <form action={ submitFeedback } className="flex flex-col items-center justify-center px-6 my-2">

                <textarea onChange={ (e)=> handleFeedback(e)} rows={5} className="bg-evento-white border-2 border-evento-border-white dark:border-evento-border-black dark:bg-evento-black placeholder-slate-500 w-full h-auto focus:border-2 rounded-xl focus:border-evento-black py-3 px-5 outline-none" placeholder="your feedback.." value={feedback} />
                <button type="submit" className={`block w-2/5 text-center mt-4 mb-1 p-2 capitalize font-extrabold text-white ${feedback.length > minFeedbacknCharacters ? 'bg-green-500': 'bg-black'} rounded-md transition`}>submit</button>
            </form>

            <BottomNavBar active="Feedback" />
        </div>
    )
}