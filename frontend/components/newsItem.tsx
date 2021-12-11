import { FC } from "react"

interface Params {
  title: string
  description: string
  date: string
  writer: string
}

const NewsItem: FC<Params> = ({ title, description, date, writer }) => {
  return (
    <>
      <div>
        <p className="text-lg font-bold">- {title}</p>
      </div>
      <div className="py-0.5 px-4">
        <p className="text-base">
          {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi quos
          deserunt veritatis eveniet commodi nesciunt harum ipsam illum neque,
          magnam dolore fugit doloremque sed impedit. */}
          {description}
        </p>
      </div>
      <div className="pl-3.5 pt-0.5 flex flex-row pb-3.5">
        <div>
          <p className="text-sm">
            Posted on {date} | by {writer}
          </p>
        </div>
      </div>
    </>
  )
}

export default NewsItem
