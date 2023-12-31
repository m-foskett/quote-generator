
// Standard Imports
import React, { useEffect, useState } from 'react'
// Material UI
import { Backdrop, Box, CircularProgress, Fade, Modal } from '@mui/material';
// Custom Components Imports
import ImageBlob from './animations/ImageBlob';
import AnimatedDownloadButton from './animations/AnimatedDownloadButton';

interface QuoteGeneratorProps {
    open: boolean;
    close: () => void;
    processingQuote: boolean;
    setProcessingQuote: React.Dispatch<React.SetStateAction<boolean>>;
    quoteReceived: String | null;
    setQuoteReceived: React.Dispatch<React.SetStateAction<String | null>>;
}

const QuoteGenerator = ({
    open,
    close,
    processingQuote,
    quoteReceived,
}: QuoteGeneratorProps) => {
    // State Variables
    const [blobUrl, setBlobUrl] = useState<string | null>(null);
    // Loading state quote info
    const wiseDevQuote = '"One does not simply center a div."';
    const wiseDevQuoteAuthor = '- Every developer ever.'
    // Custom Function: Download Quote Card Handler
    const handleDownload = () => {
        const link = document.createElement('a');
        if (typeof blobUrl === 'string') {
            link.href = blobUrl;
            link.download = 'quote.png';
            link.click();
        };
    };
    // Custom Function: Receiving Quote Card Handler
    useEffect(() => {
        if(quoteReceived) {
            // Convert the received blob base64 data into an image URL for download
            const binaryData = Buffer.from(quoteReceived, 'base64');
            const blob = new Blob([binaryData], {type: 'image/png'});
            const blobUrlGenerated = URL.createObjectURL(blob);
            console.log(blobUrlGenerated);
            setBlobUrl(blobUrlGenerated);
            // Revoke old blobUrl
            return () => {
                URL.revokeObjectURL(blobUrlGenerated);
            }
        }
    }, [quoteReceived])

    return (
        <Modal
            id="QuoteGeneratorModal"
            aria-labelledby="spring-modal-quotegeneratormodal"
            aria-describedby="spring-modal-opens-and-closes-quote-generator"
            open={open}
            onClose={close}
            closeAfterTransition
        >
            <Fade
                in={open}
            >
                {/* Quote Generator Modal Outer Container */}
                <Box
                    className="min-h-[350px] min-w-[350px] h-[70vh] w-[70vw] border-2 border-solid border-primary-950
                    rounded-xl top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] absolute z-[2]
                    bg-primary-700 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 neon-primary"
                >
                    {/* Quote Generator Modal Inner Container */}
                    <div
                        className='top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] relative'
                    >
                        {/* State 1: Processing Request of Quote + Quote State is empty */}
                        {(processingQuote === true && quoteReceived === null) &&
                            <>
                                <CircularProgress
                                    className='relative ml-[-55px] left-[50%] -translate-x-[50%] stroke-primary-50'
                                    size={"8rem"}
                                    thickness={2.5}
                                    color='inherit'
                                />
                                {/* Quote Generator Title */}
                                <div
                                    className="text-xl text-center text-primary-50 px-0 py-5 relative sm:text-5xl"
                                >
                                    Creating your quote...
                                </div>
                                {/* Quote Generator Subtitle */}
                                <div
                                    className="text-md text-center text-primary-50 px-0 py-5 w-[100%] relative sm:text-2xl italic"
                                    style={{marginTop: "20px"}}
                                >
                                    {wiseDevQuote}
                                    <br/>
                                    <span style={{fontSize: 26}}>{wiseDevQuoteAuthor}</span>
                                </div>
                            </>
                        }
                        {/* State 2: Quote State Fulfilled */}
                        {quoteReceived !== null &&
                            <div className='items-center'>
                                {/* Quote Generator Title */}
                                <div
                                    className="text-xl text-center text-primary-50 px-0 py-5 relative sm:text-5xl"
                                >
                                    Download your quote!
                                </div>
                                {/* Quote Generator Subtitle */}
                                <div
                                    className="text-md text-center text-primary-50 px-0 py-5 w-[100%] relative sm:text-2xl italic"
                                    style={{marginTop: "20px"}}
                                >
                                    See a preview:
                                </div>
                                {/* Image Blob Container */}
                                <div
                                    className='relative text-center top-3 mt-5 ease-in-out duration-300 w-fit m-auto h-24 z-[99999]
                                    cursor-pointer origin-center bg-primary-700 bg-clip-padding neon-primary
                                    hover:z-index[99999] hover:brightness-150 hover:ease-in-out hover:scale-[4.8] hover:origin-center
                                    hover:duration-300'
                                >
                                    <ImageBlob
                                        quoteReceived={quoteReceived}
                                        blobUrl={blobUrl}
                                    />
                                </div>
                                {/* Animated Download Button */}
                                    <AnimatedDownloadButton
                                        handleDownload={handleDownload}
                                    />
                            </div>
                        }
                    </div>
                </Box>
            </Fade>
        </Modal>
    )
}

export default QuoteGenerator