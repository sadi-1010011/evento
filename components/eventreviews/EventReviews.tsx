"use client"

import { useState } from "react"

export default function EventReviews() {

    const [showreviews, setShowReviews] = useState(false);
    let reviews = 'No reviews found!';

    return (
        <div className="w-full">

        <div onClick={ () => setShowReviews(!showreviews) } className="flex my-6 mx-4 py-3 items-center justify-center rounded-md border-2 border-slate-800 hover:bg-slate-700 hover:text-white transition-all">
            <h2 className="capitalize ">show reviews</h2>
        </div>
        
        <hr style={{ width: '90%', display: 'block', margin: '1.4rem auto'}} />

        {
            showreviews && <h2 className="my-2 text-center text-gray-600 dark:text-slate-200">{ reviews }</h2>
        }

        {
            showreviews && <input type="text" className="my-2 w-full py-2 rounded-md border-none outline-none text-center placeholder-gray-400 bg-evento-white dark:bg-evento-black dark:text-slate-200" placeholder="Leave a review.." />
        }

        </div>
    )
}