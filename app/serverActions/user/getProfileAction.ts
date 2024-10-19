"use server"


const getProfileAction = async (profileurlkey: string) => {
    try {
      const url = `https://plutoevents.s3.amazonaws.com/${profileurlkey}`; 
      return (url).toString();
    } catch (error) {
    console.error('Error fetching image from S3:', error);
    return 0;
  }
}

export default getProfileAction;