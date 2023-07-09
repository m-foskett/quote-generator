import Head from 'next/head'
import Image from 'next/image'
// Components
import { BackgroundImage1, GradientBackgroundCon } from '../components/quote_generator/QuoteGeneratorElements'
// Assets
import Brain from '../assets/brain.jpg'
export default function Home() {
  return (
    <>
      <Head>
        <title>Inspirational Quote Generator</title>
        <meta name="description" content="Generates an inspirational quote!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GradientBackgroundCon>
        {/* <BackgroundImage1
          src={Brain}
          height="300"
          alt="brain"
        /> */}
      </GradientBackgroundCon>
    </>
  )
}
