'use client'

import Image from 'next/image'
// Assets
import GreenBook from '../assets/green-book.png'
import OrangeBook from '../assets/orange-book.png'
import { useEffect, useState } from 'react'
import Footer from '@/components/Footer';
import QuoteModal from '@/components/QuoteModal'
import { quotesQueryName } from '@/graphql/queries'

// AWS imports
import { Amplify, API, Auth, withSSRContext } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api-graphql'
import awsExports from '@/aws-exports';
import QuoteGenerator from '@/components/QuoteGenerator'

Amplify.configure({ ...awsExports, ssr: true });

// Interface for DynamoDB object
interface UpdateQuoteInfoData {
  id: string;
  queryName: string;
  quotesGenerated: number;
  createdAt: string;
  updatedAt: string;
}
// Type guard for the fetch
function isGraphQLResultForQuotesQueryName(response: any): response is GraphQLResult<{
  quotesQueryName: {
    items: [UpdateQuoteInfoData];
  };
}> {
  return response.data && response.data.quotesQueryName && response.data.quotesQueryName.items;
}

export default function Home() {
  // State Variables
  const [numberOfQuotes, setNumberOfQuotes] = useState<Number>(0);
  const [openGenerator, setOpenGenerator] = useState<boolean>(false);
  const [processingQuote, setProcessingQuote] = useState<boolean>(false);
  const [quoteReceived, setQuoteReceived] = useState<String | null>(null);

  // Function to fetch DynamoDB object (quotes generated)
  const updateQuoteInfo = async () => {
    try {
      const response = await API.graphql<UpdateQuoteInfoData>({
        query: quotesQueryName,
        authMode: 'AWS_IAM',
        variables: {
          queryName: "LIVE",
        },
      })
      console.log('response', response);
      // Type Guards for response
      if(!isGraphQLResultForQuotesQueryName(response)){
        throw new Error('Unexpected response from API.graphql');
      }
      if (!response.data) {
        throw new Error('Response data is undefined');
      }

      const receivedNumberOfQuotes = response.data.quotesQueryName.items[0].quotesGenerated;
      setNumberOfQuotes(receivedNumberOfQuotes);

    } catch (error) {
      console.log('error getting quote data', error);
    }
  }

  useEffect(() => {
    updateQuoteInfo();
  }, []);

  // Quote Generator Close Handler
  const handleCloseGenerator = () => {
    setOpenGenerator(false);
  }
  // Quote Generator Open Handler
  const handleOpenGenerator = async (e: React.SyntheticEvent) => {
    // Prevent default reload behaviour
    e.preventDefault();
    // Toggle Open the Generator Modal
    setOpenGenerator(true);
    // Toggle the processing state
    setProcessingQuote(true);
    try {
      // Run the Lambda Function
      setProcessingQuote(false);
    } catch (error) {
      console.log('error generating the quote:', error);
      setProcessingQuote(false);
    }
  }

  return (
    // Gradient Background
    <div className='w-screen h-screen bg-gradient-to-r from-lime-900 to-lime-300 animate-gradient-x'>
      {/* Quote Generator Modal */}
      <QuoteGenerator
        open={openGenerator}
        close={handleCloseGenerator}
        processingQuote={processingQuote}
        setProcessingQuote={setProcessingQuote}
        quoteReceived={quoteReceived}
        setQuoteReceived={setQuoteReceived}
      />
      {/* Quote Modal */}
      <QuoteModal handleOpenGenerator={handleOpenGenerator}/>
      {/* Background Images */}
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
      {/* Footer */}
      <Footer numberOfQuotes={numberOfQuotes}/>
    </div>
  )
}
