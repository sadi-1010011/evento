"use client"

import { useState } from "react"
import Modal from "../modal/Modal";

export default function EventReviews() {

    const [showreviews, setShowReviews] = useState(false);
    const [review, setReview] = useState('');
    const [toggleModal, setToggleModal] = useState(false);
    let reviews = 'No reviews found!';

    const handleReviewSubmit = () => {
        // alert('review system coming soon :)');
        setToggleModal(!toggleModal);
        setReview('');
    }

    return (
        <div className="w-full">

        <div onClick={ () => setShowReviews(!showreviews) } className="flex my-6 mx-4 py-3 items-center justify-center rounded-md border-2 border-slate-800 hover:bg-slate-700 hover:text-white transition-all">
            <h2 className="capitalize ">show reviews</h2>
        </div>
        
        <hr style={{ width: '90%', display: 'block', margin: '1rem auto'}} />

        {
            showreviews && 
                <div className="w-full flex flex-col my-2 items-center justify-center" id="reviewsection">
                    <h2 className="my-2 text-center text-gray-600 dark:text-slate-200">{ reviews }</h2>
                    <input type="text" onChange={ (e) => setReview(e.currentTarget.value)} className="my-2 w-full py-2 rounded-md border-none outline-none text-center placeholder-gray-400 bg-evento-white dark:bg-evento-black dark:text-slate-200" placeholder="Leave a review.." value={review} />
                    { review && <button onClick={ () =>  handleReviewSubmit() } className="my-2 py-2 px-4 rounded-md border-2 bg-slate-700 dark:bg-evento-white text-white dark:text-evento-black hover:border-slate-700 hover:bg-slate-800 hover:text-white transition capitalize shadow-md">submit</button>}
                </div>
        }


        {
            toggleModal && <Modal text="review system coming soon :)" success={false} />
            // review && <div className="">{ review }</div>
        }

        </div>
    )
}