import Link from "next/link";

interface FooterProps {
    numberOfQuotes: Number;
}

const Footer = ({numberOfQuotes, }: FooterProps) => {
  return (
    <div className='w-screen h-[50px] text-center text-md absolute bottom-0 text-primary-50 z-[999999]'>
        {'Quotes Generated: ' + numberOfQuotes}
        <br/>
        {'Developed by '}
        <Link
          href={'https://github.com/m-foskett'}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-primary-900"
        >
          Mark Foskett
        </Link>
    </div>
  )
}

export default Footer