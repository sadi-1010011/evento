"use server"

const getEventPosterAction = async (posterurlkey: string) => {
    const url = `https://plutoevents.s3.amazonaws.com/${posterurlkey}`;
    return (url);  
}

export default getEventPosterAction;