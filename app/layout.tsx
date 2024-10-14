import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pluto - discover events around you",
  description: "platform to host and find events of your interest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-evento-white dark:bg-evento-black md:w-2/3 lg:w-1/2 block m-auto text-black ${inter.className}`}>
        <Suspense fallback={<div className="flex w-full h-screen items-center justify-center">loading..</div>}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
