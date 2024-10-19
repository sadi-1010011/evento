"use client"

import addProfileLinkAction from "@/app/serverActions/user/addProfileLinkAction";
import getProfileAction from "@/app/serverActions/user/getProfileAction";
import { userLogout } from "@/app/serverActions/userLogout";
import DummyIcon from "@/assets/icons/bottomnavbar/userDark.png";
import HostIcon from "@/assets/icons/host_dark.png";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function ProfileCard({ id, isadmin, name, profileurlkey, likedEvents }: { id: string, isadmin: boolean, name: string, profileurlkey: string, likedEvents: number }) {

    const userId = id;
    const [file, setFile] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false)
    const [profileURL, setProfileURL] = useState('');

    useEffect(() => {
        if (id !== undefined) localStorage.setItem('user', id);
        if (id && isadmin) localStorage.setItem('isAdmin', name);
    }, [userId]);

    const handleProfileUpload = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    
        if (!file) {
          alert('Please select a profile to upload.'); return
        }
    
        setUploading(true)
    
        const response = await fetch(
          `/api/user/${userId}/profile`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ filename: file.name, contentType: file.type }),
          }
        )
    
        if (response.ok) {

          const { url, fields } = await response.json()
    
          const formData = new FormData();
          Object.entries(fields).forEach(([key, value]) => {
            formData.append(key, value as string)
          })

          formData.append('file', file)
    
          const uploadResponse = await fetch(url, {
            method: 'POST',
            body: formData,
          })
    
          if (uploadResponse.ok) {
            alert('Upload successful!');

            const profilekey = await fields.key;
            // update new link in user object
            addProfileLinkAction(userId, String(profilekey)).then(res => {
              console.log("user profile updated", res);
              if (res) userLogout(); // logout and relogin to apply change!
            })
            // setProfileURL(fields.key as string);
          } else {
            console.error('S3 Upload Error:', uploadResponse)
            alert('s3 Upload failed.')
          }
        } else {
          alert('Failed to get pre-signed URL.')
        }
    
        setUploading(false)
    }

    useEffect(() => {
      if (profileurlkey && userId) getProfileAction(profileurlkey).then(res => {
        if (res) setProfileURL(res);
        else setProfileURL('');
      })
    }, [profileURL, profileurlkey]);
    
    return (
        <>
        <div className="flex items-center justify-around w-4/5 sm:w-4/5 md:w-4/5 lg:w-2/3 xl:w-2/3 px-2 py-6 bg-evento-white text-black rounded-3xl shadow-evento-shadow mt-2">

            {/* PROFILE PIC, NAME */}
            <div className="flex flex-col items-center w-2/3">
                {
                profileURL ?
                  <Image priority className="w-3/5 h-auto aspect-square border-gray-300 border p-1.5 rounded-full" width={100} height={100} src={ profileURL || DummyIcon} alt="profile" />
                :                
                  <form className="flex flex-col items-center justify-center gap-1.5" onSubmit={ handleProfileUpload }>
                    <input id="file" type="file" onChange={ (e) => {const files = e.target.files; if (files) setFile(files[0])}} accept="image/png, image/jpeg" className="w-3/5 h-full aspect-square p-1.5 rounded-full opacity-20 outline-none border-gray-300 border-2 bg-gray-200" />
                    <button type="submit" className="z-10 text-xs py-1 -mt-10 px-2 w-1/2 rounded-md border-2 bg-slate-100  hover:text-white text-black hover:border-slate-700 hover:bg-slate-800 font-semibold capitalize shadow-md" disabled={uploading}>Upload</button>
                  </form>}
                
                <h1 className="text-2xl font-bold capitalize text-center pt-2 break-all">{ name || 'name'}</h1>
                <div className="inline-flex items-center gap-x-0.5 w-11/12 justify-center">
                    <Image src={HostIcon} width={22} height={22} className="inline p-0.5" alt="host icon" />
                    <span className="text-sm font-semibold text-center overflow-x-scroll">{ 'superhost' }</span>
                </div>
            </div>

            {/* INFO */}
            <div className="flex flex-col w-1/3 text-left items-left justify-evenly">
                <div>
                    <h1 className="text-xl font-bold capitalize pt-2">0</h1>
                    <span className="text-xs font-semibold capitalize text-slate-500">attended</span>
                </div>
                <div className="inline-flex flex-col items-start">
                    <h1 className="inline-flex items-center justify-center gap-x-1 text-xl font-bold capitalize pt-2">
                        0
                        {/* <Image src={RatingIcon} width={12} height={12} alt="rating icon" /> */}
                    </h1>
                    <span className="text-xs font-semibold capitalize text-slate-500">shared</span>
                </div>
                <div>
                    <h1 className="text-xl font-bold capitalize pt-2">{ likedEvents || 0 }</h1>
                    <span className="text-xs font-semibold capitalize text-slate-500">liked</span>
                </div>
            </div>


        </div>

        </>
    );
}