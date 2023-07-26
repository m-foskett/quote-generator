import React from 'react'
import Image from 'next/image'

interface ImageBlobProps {
  quoteReceived: String;
  blobUrl: String | null;
}

const ImageBlob = ({quoteReceived, blobUrl}: ImageBlobProps) => {
  return (
    <div>ImageBlob</div>
  )
}

export default ImageBlob