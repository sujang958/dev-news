import type { NextPage } from "next"
import NewsItem from "../components/newsItem"

const Home: NextPage = () => {
  return (
    <div className="py-10 px-20">
      <div className="flex flex-col gap-y-2.5">
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

export default Home
