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
          <div className="px-2">
            <div className="p-0.5">
              <p className="text-lg font-bold">
                What should I upload on normal news?
              </p>
              <div className="px-0.5">
                <p className="text-base">
                  Upload something that developers would be interested in.
                </p>
              </div>
            </div>
            <div className="p-0.5">
              <p className="text-lg font-bold">
                What shouldn&apos;t I upload on here?
              </p>
              <div className="px-0.5">
                {" "}
                <p className="text-base">
                  Don&apos;t upload things related to politics, sports, and
                  religion.
                </p>
              </div>
            </div>
            <div className="p-0.5">
              <p className="text-lg font-bold" id="prmt">What is Prmt?</p>
              <div className="px-0.5">
                <p className="text-base">
                  Prmt is a service for your some cool projects
                </p>
                <p className="text-base">You can upload Prmt cool projects.</p>
                <p className="text-base">
                  Please upload projects that developers would be interested in.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
