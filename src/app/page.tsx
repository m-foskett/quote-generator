'use client'

import Image from 'next/image'
// Assets
import GreenBook from '../assets/green-book.png'
import OrangeBook from '../assets/orange-book.png'
import { useState } from 'react'
import Footer from '@/components/Footer';

export default function Home() {
  // State Variables
  const [numberOfQuotes, setNumberOfQuotes] = useState<Number>(0);

  return (
    <div className='w-screen h-screen bg-gradient-to-r from-lime-900 to-lime-300 animate-gradient-x'>
      <Image
        src={GreenBook}
        alt="green book"
        width={100}
        height={100}
        className='relative z-[1] ml-[90px] pt-[96px]'
      />
      <Image
        src={OrangeBook}
        alt="orange book"
        width={150}
        height={150}
        className='fixed z-[1] right-[98px] bottom-[67px]'
      />
      <Footer numberOfQuotes={numberOfQuotes}/>
    </div>
  )
}
