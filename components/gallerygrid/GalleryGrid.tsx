"use client"
import DummyImg from "@/assets/eventoLogo.jpeg";
import "./styles.css";
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
        <div className="grid-container w-full 3 flex flex-row flex-wrap items-center justify-evenly text-center">
            <div className="w-1/3 h-auto">
                <Image src={image ? image : DummyImg} width="300" height="300" className="w-full h-auto" alt="gallery image" />
            </div>
            <div className="w-1/3 h-auto">
                <Image src={image ? image : DummyImg} width="300" height="300" className="w-full h-auto" alt="gallery image" />
            </div>
            <div className="w-1/3 h-auto">
                <Image src={image ? image : DummyImg} width="300" height="300" className="w-full h-auto" alt="gallery image" />
            </div>
            <div className="w-1/3 h-auto">
                <Image src={image ? image : DummyImg} width="300" height="300" className="w-full h-auto" alt="gallery image" />
            </div>
            <div className="w-1/3 h-auto">
                <Image src={image ? image : DummyImg} width="300" height="300" className="w-full h-auto" alt="gallery image" />
            </div>
            <div className="w-1/3 h-auto">
                <Image src={image ? image : DummyImg} width="300" height="300" className="w-full h-auto" alt="gallery image" />
            </div>
            <div className="w-1/3 h-auto">
                <Image src={image ? image : DummyImg} width="300" height="300" className="w-full h-auto" alt="gallery image" />
            </div>
            <div className="w-1/3 h-auto">
                <Image src={image ? image : DummyImg} width="300" height="300" className="w-full h-auto" alt="gallery image" />
            </div>
            <div className="w-1/3 h-auto">
                <Image src={image ? image : DummyImg} width="300" height="300" className="w-full h-auto" alt="gallery image" />
            </div>
        </div>
    );
}