'use client'

// Standard Imports
import { useEffect, useState } from 'react'
import Image from 'next/image'
// Assets Imports
import MarcusAurelius from '../assets/marcus-aurelius.png'
import Owl from '../assets/owl.png'
// Custom Components Imports
import Footer from '@/components/Footer';
import QuoteModal from '@/components/QuoteModal'
import QuoteGenerator from '@/components/QuoteGenerator'
// AWS imports
import { Amplify, API, } from 'aws-amplify';
import awsExports from '@/aws-exports';
import { GraphQLResult } from '@aws-amplify/api-graphql'
import { generateAQuote, quotesQueryName } from '@/graphql/queries'

Amplify.configure({ ...awsExports, ssr: true });

// Interface for AppSync & Lambda JSON response
interface GenerateAQuoteData {
  generateAQuote: {
    statusCode: number,
    headers: { [key: string]: string};
    body: string;
  }
}
// Interface for DynamoDB object
interface UpdateQuoteInfoData {
  id: string;
  queryName: string;
  quotesGenerated: number;
  createdAt: string;
  updatedAt: string;
}
// Type guard for the GraphQL quote data fetch
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

  // Function to fetch DynamoDB object (number of quotes generated)
  const updateQuoteInfo = async () => {
    try {
      // Query the DynamoDB object for the quote data
      const response = await API.graphql<UpdateQuoteInfoData>({
        query: quotesQueryName,
        authMode: 'AWS_IAM',
        variables: {
          queryName: "LIVE",
        },
      });
      // Type Guards for the GraphQL response
      if(!isGraphQLResultForQuotesQueryName(response)){
        throw new Error('Unexpected response from API.graphql');
      }
      if (!response.data) {
        throw new Error('Response data is undefined');
      }
      // Get the total number of quotes generated from the GraphQL query response
      const receivedNumberOfQuotes = response.data.quotesQueryName.items[0].quotesGenerated;
      setNumberOfQuotes(receivedNumberOfQuotes);
    } catch (error) {
      console.log('error getting quote data', error);
    };
  };

  // useEffect to query the GraphQL object and update numberOfQuotes on render
  useEffect(() => {
    updateQuoteInfo();
  }, []);

  // Quote Generator Open Handler
  // -  Handles processing states
  // -  Runs Lambda Function
  // -  Updates state variables with newly generated quote data
  const handleOpenGenerator = async (e: React.SyntheticEvent) => {
    // Prevent default reload behaviour
    e.preventDefault();
    // Toggle Open the Generator Modal
    setOpenGenerator(true);
    // Toggle the processing state
    setProcessingQuote(true);
    try {
      // Run the Lambda Function to generate a new quote
      const runFunction = "runFunction";
      const runFunctionStringified = JSON.stringify(runFunction);
      const response = await API.graphql<GenerateAQuoteData>({
        query: generateAQuote,
        authMode: "AWS_IAM",
        variables: {
          input: runFunctionStringified,
        },
      });
      // Get the generated result of the Lambda Function
      const responseStringified = JSON.stringify(response);
      const responseRestringified = JSON.stringify(responseStringified);
      const bodyIndex = responseRestringified.indexOf('body=') + 5;
      const bodyAndBase64 = responseRestringified.substring(bodyIndex);
      const bodyArray = bodyAndBase64.split(",");
      const body = bodyArray[0];
      // Set the newly received quote
      setQuoteReceived(body);
      // End the processing state
      setProcessingQuote(false);
      // Update the generated quotes counter
      updateQuoteInfo();
    } catch (error) {
      console.log('error generating the quote:', error);
      // End the processing state
      setProcessingQuote(false);
    }
  }

  // Quote Generator Close Handler
  // -  Toggles the processing and generator states
  // -  Resets the quote state variable to null
  const handleCloseGenerator = () => {
    setOpenGenerator(false);
    setProcessingQuote(false);
    setQuoteReceived(null);
  }

  return (
    // Gradient Background
    <div className='w-screen h-screen bg-gradient-to-r from-primary-900 to-primary-300 animate-gradient-x'>
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
        src={Owl}
        alt="owl"
        width={150}
        height={150}
        className='relative z-[1] ml-[70px] pt-[96px]'
      />
      <Image
        src={MarcusAurelius}
        alt="marcus-aurelius"
        width={150}
        height={150}
        className='fixed z-[1] right-[98px] bottom-[67px]'
      />
      {/* Footer */}
      <Footer numberOfQuotes={numberOfQuotes}/>
    </div>
  )
}
