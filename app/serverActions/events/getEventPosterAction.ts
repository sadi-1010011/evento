"use server"

const getEventPosterAction = async (posterurlkey: string) => {
  try {
    const url = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${posterurlkey}`;
    return (url).toString();
  }
  
    catch (error) {
      console.error('Error fetching image from S3:', error);
      return 0;
  }
}

export default getEventPosterAction;