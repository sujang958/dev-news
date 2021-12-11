import { NextPage } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import API from "../../../utils/api"

const Profile: NextPage = () => {
  const [loaded, setLoadedState] = useState(false)
  const [user, setUser] = useState<any>({})
  const router = useRouter()
  useEffect((): any => {
    // aaa://asdf/a/p/
    const id = location.href.split("/")[5]
    API.get(`/accounts/users/${id}`)
      .then(({ data }) => {
        console.log(data)
        setUser(data.user)
        setLoadedState(true)
      })
      .catch((e) => {
        console.log(e)
        router.push("/404")
      })
  }, [])

  if (!loaded)
    return (
      <div className="text-center pt-32">
        <Image
          src="/img/loading.png"
          width={64}
          height={64}
          className="animate-spin"
        />
      </div>
    )

  return (
    <div className="px-1 md:px-48 pt-10">
      <div className="p-8 flex flex-col divide-y divide-black gap-2">
        <div className="p-1">
          <div>
            <p className="text-5xl font-bold">{user.id}</p>
          </div>
          <div className="px-1">
            <p className="text-xl">{user.email}</p>
          </div>
        </div>
        <div className="pt-2 px-4">
          <p className="text-lg">Bio</p>
          <div className="px-1.5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
            rerum nam voluptas? Delectus impedit ipsam, recusandae officia
            nesciunt placeat cumque vero repellat? Ad, dolore animi neque
            officia ipsam itaque aut assumenda natus rerum repellat nihil,
            delectus et ab amet officiis quis soluta ullam est sapiente
            aspernatur error. Voluptatem, vero doloremque.
          </div>
        </div>
      </div>
      <div className="transition transform transform-gpu ease-in-out duration-100 hover:scale-110 rounded-lg py-5 px-10 bg-gray-100 shadow-xl">
        <p className="text-3xl font-bold">Posts</p>
      </div>
    </div>
  )
}

export default Profile
