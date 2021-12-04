import type { NextPage } from "next"

const Home: NextPage = () => {
  return (
    <div className="py-10 px-20">
      <div className="flex flex-col gap-y-2.5">
        <div className="p-1 flex flex-row">
          <div className="flex flex-col">
            <div>
              <p className="text-base font-bold">
                - Nvidia try to takeover ARM holdings
              </p>
            </div>
            <div className="py-0.5 px-4">
              <p className="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
                quos deserunt veritatis eveniet commodi nesciunt harum ipsam
                illum neque, magnam dolore fugit doloremque sed impedit.
              </p>
            </div>
            <div className="pl-3.5 pt-0.5 flex flex-row">
              <div>
                <p className="text-xs">Posted on Oct 20 2021 | by #System</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
