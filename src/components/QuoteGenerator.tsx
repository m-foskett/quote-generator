import React from 'react'
// Material UI
import { Backdrop, Box, CircularProgress, Fade, Modal } from '@mui/material';
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
    setProcessingQuote,
    quoteReceived,
    setQuoteReceived,
}: QuoteGeneratorProps) => {

    const wiseDevQuote = '"One does not simply center a div."';
    const wiseDevQuoteAuthor = '- Every developer ever.'
    return (
        <Modal
            id="QuoteGeneratorModal"
            aria-labelledby="spring-modal-quotegeneratormodal"
            aria-describedby="spring-modal-opens-and-closes-quote-generator"
            open={open}
            onClose={close}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade
                in={open}
            >
                {/* Quote Generator Modal Outer Container */}
                <Box
                    className="min-h-[350px] min-w-[350px] h-[70vh] w-[70vw] border-2 border-solid border-lime-950
                    rounded-xl top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] absolute z-[2]
                    bg-lime-600 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 shadow-lime-300 shadow-lg"
                >
                    {/* Quote Generator Modal Inner Container */}
                    <div className='top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] relative'>
                        {/* State 1: Processing Request of Quote + Quote State is empty */}
                        {(processingQuote === true && quoteReceived === null) &&
                            <>
                                <CircularProgress
                                    className='relative ml-[-55px] left-[50%] -translate-x-[50%] stroke-white'
                                    size={"8rem"}
                                    thickness={2.5}
                                    color='inherit'
                                />
                                {/* Quote Generator Title */}
                                <div
                                    className="text-xl text-center text-lime-50 px-0 py-5 relative sm:text-5xl"
                                >
                                    Creating your quote...
                                </div>
                                {/* Quote Generator Subtitle */}
                                <div
                                    className="text-md text-center text-lime-50 px-0 py-5 w-[100%] relative sm:text-2xl italic"
                                    style={{marginTop: "20px"}}
                                >
                                    {wiseDevQuote}
                                    <br/>
                                    <span style={{fontSize: 26}}>{wiseDevQuoteAuthor}</span>
                                </div>
                            </>
                        }
                        {/* State 2: Quote State Fulfilled */}
                        {quoteReceived == null &&
                            <>
                                {/* Quote Generator Title */}
                                <div
                                    className="text-xl text-center text-lime-50 px-0 py-5 relative sm:text-5xl"
                                >
                                    Download your quote!
                                </div>
                                {/* Quote Generator Subtitle */}
                                <div
                                    className="text-md text-center text-lime-50 px-0 py-5 w-[100%] relative sm:text-2xl italic"
                                    style={{marginTop: "20px"}}
                                >
                                    See a preview:
                                </div>
                                {/* Image Blob Container */}
                                <div
                                    className='relative text-center top-3 mt-5 ease-in-out duration-300 w-fit m-auto h-24 z-[99999]
                                    cursor-pointer origin-center bg-lime-700 bg-clip-padding shadow-lime-300 shadow-lg
                                    hover:z-index[99999] hover:brightness-150 hover:ease-in-out hover:scale-[4.8] hover:origin-center
                                    hover:duration-300'
                                >
                                    <ImageBlob
                                    />
                                </div>
                                {/* Animated Download Button */}
                                <AnimatedDownloadButton
                                />
                            </>
                        }
                    </div>
                </Box>
            </Fade>
        </Modal>
    )
}

export default QuoteGenerator