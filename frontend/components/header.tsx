import { FC } from "react"
import Link from "next/link"

const Header: FC = () => {
  return (
    <div className="text-white bg-darkLightBlue">
      <div className="py-4 px-5 flex flex-row">
        <div className="flex flex-row">
          <div className="mr-5">
            <p className="font-bold text-xl cursor-pointer hover:underline">
              <Link href="/">Dev-news</Link>
            </p>
          </div>
          <div className="flex flex-row mt-1 gap-x-4">
            <div>
              <p className="text-base cursor-pointer hover:underline">Latest</p>
            </div>
            <div>
              <p className="text-base cursor-pointer hover:underline">Prmt</p>
            </div>
            <div>
              <p className="text-base cursor-pointer hover:underline">
                <Link href="/about">About</Link>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-1 ml-auto">
          <p className="text-base hover:underline cursor-pointer">
            Write a news
          </p>
        </div>
      </div>
    </div>
  )
}

export default Header
