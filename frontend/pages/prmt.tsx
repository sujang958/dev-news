import { NextPage } from "next"
import Link from "next/link"
import NewsItem from "../components/newsItem"

const Prmt: NextPage = () => {
  return (
    <div className="py-10 px-20">
      <p className="text-center text-2xl text-black underline cursor-pointer">
        <Link href="/about#prmt">What is Prmt?</Link>
      </p>
      <div className="mt-5 flex flex-col gap-y-2.5">
        <div className="p-1 flex flex-row">
          <div className="flex flex-col">
            <NewsItem
              title="Nvidia try to takeover ARM holdings"
              description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
                quos deserunt veritatis eveniet commodi nesciunt harum ipsam
                illum neque, magnam dolore fugit doloremque sed impedit."
              date="Oct 20 2021"
              writer="#system"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Prmt
