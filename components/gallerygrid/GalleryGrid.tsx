"use client"

import DummyImg from "@/assets/eventoLogo.jpeg";
import styles from "./gallery.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function GalleryGrid({ thumbnail, images }: { thumbnail: string, images: any }) {

    const [allimages, setAllImages] = useState(images)
    const [singleview, setSingleView] = useState(false)
    const gallerypattern = ['tall', 'taller', 'tallest', 'short', 'wider'];

    useEffect(() => {
        console.log(images)
        if (allimages.length > 1) {
            setSingleView(false)
        } else setSingleView(true);
    }, [images]);

    function handleGalleryView(e: any) {
        const gallery = e.currentTarget;
    }

    function getclassname() { return gallerypattern[Math.floor(gallerypattern.length * Math.random())]}

    return(

        <div className={styles.grid_gallery} onClick={ (e)=> handleGalleryView(e) }>
            {
                singleview ?
                        <Image className="w-full h-auto" src={ thumbnail || DummyImg} width={100} height={100} alt="event gallery" />
                    :
                 images.map((image: any, i: number) => 
                    <div key={i} className={`${styles.grid_item} ${getclassname}`}>
                        <Image className="w-full h-auto" src={image || DummyImg} width={100} height={100} alt="event gallery" />
                    </div>)
            }
            {/* <div className={`${styles.grid_item} ${styles.tall}`}>
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
            </div> */}
        </div>
    
    );
}