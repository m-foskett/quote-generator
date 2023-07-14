interface QuoteModalProps {

}

const QuoteModal = ({}: QuoteModalProps) => {
  return (
    // Outer Container
    <div
        className="min-h-[350px] min-w-[350px] h-[70vh] w-[70vw] border-2 border-solid border-lime-950
        border-radius-[15px] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] absolute z-[2]
        bg-lime-700 shadow-lime-300 shadow-lg backdrop-blur-xl"
    >
        {/* Inner Container */}
        <div className="top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] absolute w-[100%]">
            {/* Title */}
            <div className="text-xl text-center text-lime-50 px-0 py-5 relative sm:text-5xl">
                Inspirational Quote Generator
            </div>
            {/* Subtitle */}
            <div className="text-md text-center text-lime-50 px-0 py-5 w-[100%] relative sm:text-2xl">
                Need a fresh dose of inspiration? Generate an inspirational quote with just one click!
            </div>
        </div>
    </div>
  )
}

export default QuoteModal