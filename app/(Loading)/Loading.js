"use client"

import LoadingImg from "@/assets/icons/bottomnavbar/categoryLight.png";
import styles from "./loading.module.css";

import Image from "next/image";
export default function BtnLoading() {
    // Or a custom loading skeleton component
    return (
        <div className="inline-flex items-center justify-center">
            <Image src={LoadingImg} width={22} height={22} alt="loading" className={styles.loading} />
        </div>
    )
  }