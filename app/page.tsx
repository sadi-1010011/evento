"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Logo from "@/assets/logo/pluto.png";
import Image from "next/image";
import styles from "@/app/events/style.module.css";

export default function Home() {

  const router = useRouter();

  useEffect(()=> {
    // console.log('redirecting..');
    const logo = document.getElementById('evento');
    // Little animation here..
    if (logo) {
      logo.style.transition = "0.8s";
      logo.style.opacity = '0';
    }
    setTimeout(()=> {
      router.push('/events');
    }, 800);
  }, []);

  return (
    <main id="evento" className="flex min-h-screen bg-evento-black flex-col items-center justify-center">
      <Image className={`${styles.eventoLogo}`} priority src={Logo} width={100} height={100} alt="brand logo" />
      {/* <h1 className="text-lg font-extrabold text-center pt-2">Pluto</h1> */}
    </main>
  );
}
