import {
  GoogleAuthProvider,
  signInWithCredential,
  signInWithPopup,
} from "@firebase/auth"
import { NextPage } from "next"
import Google from "../../public/img/google.svg"
import Github from "../../public/img/github.svg"
import { useRouter } from "next/router"
import { useCallback, useEffect, useState } from "react"
import CreateAccount from "../../components/createAccount"
import { auth, provider } from "../../firebase/auth"
import API from "../../utils/api"
import { browserSessionPersistence, setPersistence } from "firebase/auth"

const SignIn: NextPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuth] = useState(false)
  const signInWithGoogle = useCallback(async () => {
    try {
      const result = await signInWithPopup(auth, provider)
      const credential = GoogleAuthProvider.credentialFromResult(result)
      if (!credential) throw new Error("?")
      if (!credential.idToken || !credential.accessToken) throw new Error("?")
      localStorage.setItem("idToken", String(credential.idToken))
      API.get(`/accounts/users/${result.user.email}`)
        .then(({ data }) => {
          const redirectTarget = router.query.target
          if (data) {
            if (!redirectTarget)
              return router.push(`/accounts/profile/${result.user.email}`)
            return router.push(String(redirectTarget))
          }
        })
        .catch(() => {
          setAuth(true)
        })
    } catch (e) {
      alert(String(e) + "\nIf you deny the popup, Please allow the popup")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const idToken = localStorage.getItem("idToken")
    console.log(idToken)
    if (!idToken) return setLoading(false)
    const credential = GoogleAuthProvider.credential(idToken)
    signInWithCredential(auth, credential)
      .then(async (userCredential) => {
        localStorage.setItem("idToken", await userCredential.user.getIdToken())
        router.push(`/accounts/profile/${userCredential.user.email}`)
      })
      .catch((r) => {
        console.log(r)
        setLoading(false)
      })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) return <p className="text-5xl">Loading...</p>
  if (authenticated)
    return (
      <CreateAccount
        target={router.query.target ? `${router.query.target}` : "/"}
      />
    )

  return (
    <div className="flex flex-col text-center items-center pt-20 px-20">
      <div className="pt-10">
        <p className="text-5xl font-bold">Sign In</p>
      </div>
      <div className="pt-5 flex flex-row justify-center gap-4">
        <button onClick={() => signInWithGoogle()}>
          <br />
          <Google />
        </button>
        <button className="px-3.5" onClick={() => alert("comming soon")}>
          <br />
          <Github />
        </button>
      </div>
      <div className="">&nbsp;</div>
      <div className="border-t border-black pt-2.5">
        <p className="text-sm underline cursor-pointer text-gray-600">
          Offer me another login provider
        </p>
      </div>
    </div>
  )
}

export default SignIn
