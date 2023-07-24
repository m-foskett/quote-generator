interface QuoteModalProps {
    handleOpenGenerator: (e: React.SyntheticEvent) => Promise<void>
}

const QuoteModal = ({handleOpenGenerator, }: QuoteModalProps) => {
  return (
    // Outer Container
    <div
        className="min-h-[350px] min-w-[350px] h-[70vh] w-[70vw] border-2 border-solid border-lime-950
        rounded-xl top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] absolute z-[2]
        bg-lime-700 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-40 shadow-lime-300 shadow-lg"
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
            {/* Button */}
            <div
                className="h-24 w-72 border-2 border-solid border-lime-950 rounded-3xl mt-5 relative
                duration-300 cursor-pointer top-5 m-auto origin-center bg-lime-700 bg-clip-padding backdrop-filter
                backdrop-blur-sm bg-opacity-10 shadow-lime-300 shadow-lg hover:brightness-150 hover:ease-in-out hover:scale-110 hover:origin-center"
                onClick={handleOpenGenerator}
            >
                {/* Button Text */}
                <div
                    className="text-white text-2xl left-[50%] top-[50%] absolute -translate-x-[50%] -translate-y-[50%]
                    w-[100%] text-center font-mono"
                >
                    Generate a quote!
                </div>
            </div>
        </div>
    </div>
  )
}

export default QuoteModal