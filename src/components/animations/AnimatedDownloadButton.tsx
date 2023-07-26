import React from 'react'
import Image from 'next/image'
// React Lottie Image
import Lottie from 'react-lottie-player'
import lottieJson from '../../assets/data-center-animation.json'

interface AnimatedDownloadButtonProps {
  handleDownload: () => void;
}

const AnimatedDownloadButton = ({handleDownload}: AnimatedDownloadButtonProps) => {
  return (
    // Download Quote Card Container
    <div
      className='border-2 border-solid border-lime-950 relative rounded-3xl mt-5 scale-[0.7] m-auto
      hover:opacity-5 shadow-sm shadow-lime-300/30 backdrop-filter backdrop-blur-sm cursor-pointer w-[600px] h-[250px]'
      onClick={handleDownload}
    >
      {/* Lottie Image */}
      <Lottie
        loop
        animationData={lottieJson}
        play
        className='w-52 h-52 left-[50%] translate-x-[-50%] relative pointer-events-none'
      />
      {/* Download Quote Card Container Text */}
      <div
        className='text-white font-serif text-2xl relative w-full text-center py-0 px-5 -mt-[30px] mb-[10px]
        pointer-events-none sm:text-4xl'
      >
        Download your quote card!
      </div>
    </div>
  )
}

export default AnimatedDownloadButton