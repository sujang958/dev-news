import { NextPage } from "next"
import { useRouter } from "next/router"
import { useEffect } from "react"

const Profile: NextPage = () => {
  const router = useRouter()

  useEffect((): any => {
    const { id } = router.query
    if (!id) return router.push("/")
  }, [])

  return (
    <div>
      <div></div>
    </div>
  )
}

export default Profile
