"use client"

import { useEffect, useState } from "react";
import styles from "../animatedbtns/animatedBtns.module.css";
import { addFavoritesAction } from "@/app/serverActions/user/addFavoritesAction";
import { useRouter } from "next/navigation";
import { isEventFavoritedAction } from "@/app/serverActions/user/isEventFavoritedAction";
import { deleteFavoritesAction } from "@/app/serverActions/user/deleteFavoritesAction";
import { IncrementLikeCount } from "@/app/serverActions/user/IncrementLikedCount";
import { decrementLikeCount } from "@/app/serverActions/user/decrementLikeCount";

export function FavoriteBtn({ eventId }: { eventId: string}) {

    const [checked, setChecked] = useState(false);
    const router = useRouter();

    function handleFavorite() {
        const userId = localStorage.getItem('user');
        if (userId && eventId) {
            if (!checked) {
                // SERVER ACTION
                addFavoritesAction(userId, eventId).then(res => {
                    setChecked(true);
                    if (res.length) IncrementLikeCount(userId, eventId).then(res => console.log(res))
                    // console.log(res);
                    // CUSTOM MODAL ALERT BOX HERE..
                })
            }
            else deleteFavoritesAction(userId, eventId).then(res => {
                decrementLikeCount(userId, eventId).then(res => console.log(res))
                setChecked(false);
            })
        }
            // LOGIN TO ADD FAV
        else {
            // CUSTOM MODAL ALERT BOX HERE..
            console.log('Login to add favorites!');
            router.push('/login');
        }
    }

    useEffect(()=> {
        const userId = localStorage.getItem('user');
        if (userId && eventId) isEventFavoritedAction(eventId, userId).then(res => {
            if (res) setChecked(true);
        })
    }, [eventId])


    return (
        <div title="Like" className={styles.heart_container}>
            <input id="Give-It-An-Id" className={styles.checkbox} type="checkbox" checked={ checked } onChange={ ()=> handleFavorite() } />
            <div className={styles.svg_container}>
                <svg xmlns="http://www.w3.org/2000/svg" className={styles.svg_outline} viewBox="0 0 24 24">
                    <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z">
                    </path>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" className={styles.svg_filled} viewBox="0 0 24 24">
                    <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z">
                    </path>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" height="100" width="100" className={styles.svg_celebrate}>
                    <polygon points="10,10 20,20"></polygon>
                    <polygon points="10,50 20,50"></polygon>
                    <polygon points="20,80 30,70"></polygon>
                    <polygon points="90,10 80,20"></polygon>
                    <polygon points="90,50 80,50"></polygon>
                    <polygon points="80,80 70,70"></polygon>
                </svg>
            </div>
        </div>
    )
}