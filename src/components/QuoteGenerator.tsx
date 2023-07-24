import React from 'react'
// Material UI
import { Backdrop, Box, Fade, Modal } from '@mui/material';

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

                </div>
            </Box>
        </Fade>
    </Modal>
  )
}

export default QuoteGenerator