"use client"

import DummyImg from "@/assets/eventoLogo.jpeg";
import styles from "./gallery.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function GalleryGrid({ images }: { images: string }) {

    const [image, setImage] = useState('')
    const dataset = ['tall', 'taller', 'tallest', 'short'];

    useEffect(() => {
        if (images) {
            setImage(images);
        }
    }, [images]);


    return(

        <div className={styles.grid_gallery}>
            <div className={`${styles.grid_item} ${styles.short}`}>
                <Image className="w-full h-auto" src={image || DummyImg} width={100} height={100} alt="event gallery" />
            </div>
            <div className={`${styles.grid_item} ${styles.taller}`}>
                <Image className="w-full h-auto" src={image || DummyImg} width={100} height={100} alt="event gallery" />
            </div>
            <div className={`${styles.grid_item} ${styles.short}`}>
                <Image className="w-full h-auto" src={image || DummyImg} width={100} height={100} alt="event gallery" />
            </div>
            <div className={`${styles.grid_item} ${styles.tallest}`}>
                <Image className="w-full h-auto" src={image || DummyImg} width={100} height={100} alt="event gallery" />
            </div>
            <div className={`${styles.grid_item} ${styles.short}`}>
                <Image className="w-full h-auto" src={image || DummyImg} width={100} height={100} alt="event gallery" />
            </div>
            <div className={`${styles.grid_item} ${styles.taller}`}>
                <Image className="w-full h-auto" src={image || DummyImg} width={100} height={100} alt="event gallery" />
            </div>
            <div className={`${styles.grid_item} ${styles.short}`}>
                <Image className="w-full h-auto" src={image || DummyImg} width={100} height={100} alt="event gallery" />
            </div>
            <div className={`${styles.grid_item} ${styles.short}`}>
                <Image className="w-full h-auto" src={image || DummyImg} width={100} height={100} alt="event gallery" />
            </div>
            {/* <Image className="w-full h-auto" src={image || DummyImg} width={100} height={100} alt="event gallery" /> */}
        </div>
    
    );
}