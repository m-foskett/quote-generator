import React from 'react'
import Image from 'next/image'

interface ImageBlobProps {
  quoteReceived: String;
  blobUrl: string | null;
}

const ImageBlob = ({
  quoteReceived,
  blobUrl,
}: ImageBlobProps) => {
  // Fetching response object from Lambda
  // useEffect(() => {
  //   const response = {
  //     "statusCode": 200,
  //     "headers": {
  //       "Content-Type": "image/png",
  //       "Access-Control-Allow-Origin": "*"
  //     },
  //     "body": blob,
  //     "isBase64Encoded": true
  //   }
  //   const binaryData = Buffer.from(response.body, 'base64');
  //   const blob = new Blob([binaryData], {type: response.headers["Content-Type"]});
  //   const newBlobUrl = URL.createObjectURL(blob);
  //   setBlobUrl(newBlobUrl);
  //   // Revoke old blob URL
  //   return () => {
  //     URL.revokeObjectURL(newBlobUrl);
  //   }
  // }, []);

  if(!blobUrl) {
    return null;
  }

  return (
    <Image
      src={blobUrl}
      alt="Generated quote card"
      width={150}
      height={150}
    />
  )
}

export default ImageBlob