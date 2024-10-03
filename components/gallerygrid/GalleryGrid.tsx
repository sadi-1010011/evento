"use client"
import DummyImg from "@/assets/eventoLogo.jpeg";
import styles from './gallery.module.css';
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

        <div className={styles.gallery}>
            <div className={`${styles.imageContainer}`}>
                <Image
                    src={image}
                    alt="gallry"
                    layout="fill"
                    objectFit="cover"
                    className={styles.image}
                />
            </div>
        </div>
        // <div className={styles.gallery}>
        //      <div className={styles.imageContainer}>
        //         <Image src={image ? image : DummyImg} width="300" height="200" className={styles.image} alt="gallery image" />
        //         <Image src={image ? image : DummyImg} width="300" height="200" className={styles.image} alt="gallery image" />
        //         <Image src={image ? image : DummyImg} width="300" height="200" className={styles.image} alt="gallery image" />
        //         <Image src={image ? image : DummyImg} width="300" height="200" className={styles.image} alt="gallery image" />
        //         <Image src={image ? image : DummyImg} width="300" height="200" className={styles.image} alt="gallery image" />
        //         <Image src={image ? image : DummyImg} width="300" height="200" className={styles.image} alt="gallery image" />
        //         <Image src={image ? image : DummyImg} width="300" height="200" className={styles.image} alt="gallery image" />
        //     </div>
        // </div>
    );
}