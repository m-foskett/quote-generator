import { GradientBackgroundCon } from '@/components/quote_generator/QuoteGeneratorElements'
import Head from 'next/head'
import Image from 'next/image'


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

      </GradientBackgroundCon>
    </>
  )
}
