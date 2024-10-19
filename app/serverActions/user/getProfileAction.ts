"use server"


const getProfileAction = async (profileurlkey: string) => {
    const url = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${profileurlkey}`; 
    return (url);
}

export default getProfileAction;