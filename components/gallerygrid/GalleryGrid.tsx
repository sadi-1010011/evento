import DummyImg from "@/assets/evento.jpeg";
import "./styles.css";
import Image from "next/image";

export default function GalleryGrid() {

    return(
        <div className="grid-container w-full flex flex-row flex-wrap items-center justify-evenly text-center">
            <div className="w-1/3 h-auto">
                <Image src={DummyImg} className="w-full h-auto" alt="gallery image" />
            </div>
            <div className="w-1/3 h-auto">
                <Image src={DummyImg} className="w-full h-auto" alt="gallery image" />
            </div>
            <div className="w-1/3 h-auto">
                <Image src={DummyImg} className="w-full h-auto" alt="gallery image" />
            </div>
            <div className="w-1/3 h-auto">
                <Image src={DummyImg} className="w-full h-auto" alt="gallery image" />
            </div>
            <div className="w-1/3 h-auto">
                <Image src={DummyImg} className="w-full h-auto" alt="gallery image" />
            </div>
            <div className="w-1/3 h-auto">
                <Image src={DummyImg} className="w-full h-auto" alt="gallery image" />
            </div>
            <div className="w-1/3 h-auto">
                <Image src={DummyImg} className="w-full h-auto" alt="gallery image" />
            </div>
            <div className="w-1/3 h-auto">
                <Image src={DummyImg} className="w-full h-auto" alt="gallery image" />
            </div>
            <div className="w-1/3 h-auto">
                <Image src={DummyImg} className="w-full h-auto" alt="gallery image" />
            </div>
        </div>
    );
}