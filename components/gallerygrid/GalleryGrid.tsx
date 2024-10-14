"use client"

import DummyImg from "@/assets/eventoLogo.jpeg";
import styles from "./gallery.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function GalleryGrid({ images }: { images: string }) {

    const [image, setImage] = useState('')
    // const dataset = ['tall', 'taller', 'tallest', 'short'];

    useEffect(() => {
        if (images) {
            setImage(images);
        }
    }, [images]);

    function handleGalleryView(e: any) {
        const gallery = e.currentTarget;
    }

    return(

        <div className={styles.grid_gallery} onClick={ (e)=> handleGalleryView(e) }>
            <div className={`${styles.grid_item} ${styles.short}`}>
                <Image className="w-full h-auto" src={image || DummyImg} width={100} height={100} alt="event gallery" />
            </div>
            <div className={`${styles.grid_item} ${styles.tall}`}>
                <Image className="w-full h-auto" src={image || DummyImg} width={100} height={100} alt="event gallery" />
            </div>
            <div className={`${styles.grid_item} ${styles.short}`}>
                <Image className="w-full h-auto" src={image || DummyImg} width={100} height={100} alt="event gallery" />
            </div>
            <div className={`${styles.grid_item} ${styles.tall}`}>
                <Image className="w-full h-auto" src={image || DummyImg} width={100} height={100} alt="event gallery" />
            </div>
            <div className={`${styles.grid_item} ${styles.tall}`}>
                <Image className="w-full h-auto" src={image || DummyImg} width={100} height={100} alt="event gallery" />
            </div>
            <div className={`${styles.grid_item} ${styles.short}`}>
                <Image className="w-full h-auto" src={image || DummyImg} width={100} height={100} alt="event gallery" />
            </div>
            <div className={`${styles.grid_item} ${styles.tall}`}>
                <Image className="w-full h-auto" src={image || DummyImg} width={100} height={100} alt="event gallery" />
            </div>
            <div className={`${styles.grid_item} ${styles.short}`}>
              <Image className="w-full h-auto" src={image || DummyImg} width={100} height={100} alt="event gallery" />
            </div>
            <div className={`${styles.grid_item} ${styles.short}`}>
                <Image className="w-full h-auto" src={image || DummyImg} width={100} height={100} alt="event gallery" />
            </div>
            <div className={`${styles.grid_item} ${styles.wider}`}>
                <Image className="w-full h-auto" src={image || DummyImg} width={100} height={100} alt="event gallery" />
            </div>
        </div>
    
    );
}