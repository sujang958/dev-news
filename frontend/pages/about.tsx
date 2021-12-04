import { NextPage } from "next"

const About: NextPage = () => {
  return (
    <div>
      <div className="p-4 text-center pt-20">
        <div>
          <p className="text-3xl font-bold">About dev-news</p>
          <span className="text-base underline text-gray-500 hover:text-black cursor-pointer">
            ToS
          </span>
          <span className="ml-2 text-base underline text-gray-500 hover:text-black cursor-pointer">
            Privacy Policy
          </span>
        </div>
        <div className="mt-2">
          <p className="text-base">dev-news is news service for developers.</p>
          <p className="text-base">
            In here, developers are not just for job of developer.
          </p>
          <p className="text-base">
            In here, developers are all of people intersted in tech or
            developing.
          </p>
        </div>
        <div className="mt-12 text-left px-40">
          <p className="text-2xl font-bold">Directions for use</p>
          <div className="p-1">
            <p className="text-base">와샌즈</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
