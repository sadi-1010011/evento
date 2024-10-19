"use server"


const getProfileAction = async (profileurlkey: string) => {
    const url = `https://plutoevents.s3.amazonaws.com/${profileurlkey}`; 
    return (url);
}

export default getProfileAction;