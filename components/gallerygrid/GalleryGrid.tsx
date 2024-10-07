"use client"

import DummyImg from "@/assets/eventoLogo.jpeg";
import styles from "./gallery.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function GalleryGrid({ images }: { images: string }) {

    const [image, setImage] = useState('')

    useEffect(() => {
        if (images.length) {
            setImage(images);
        }
    }, [images]);


    return(

        <div className={styles.grid_gallery}>
            <Image className="w-full h-auto" src={image || DummyImg} width={100} height={100} alt="event gallery" />
        </div>
    
    );
}