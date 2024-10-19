"use server"

const getEventPosterAction = async (posterurlkey: string) => {
    const url = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${posterurlkey}`;
    return (url);  
}

export default getEventPosterAction;