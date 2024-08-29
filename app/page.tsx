"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {

  const router = useRouter();

  useEffect(()=> {
    console.log('redirecting..');
    setTimeout(()=> {
      router.push('/home');
    }, 800);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1>evento</h1>
    </main>
  );
}
