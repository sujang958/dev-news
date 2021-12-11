import {
  GoogleAuthProvider,
  signInWithCredential,
  signInWithPopup,
} from "@firebase/auth"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useCallback, useEffect, useState } from "react"
import CreateAccount from "../../components/createAccount"
import { auth, provider } from "../../firebase/auth"
import API from "../../utils/api"

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
    <div className="py-10 px-20">
      <div className="pt-10">
        <p className="text-5xl font-bold">Sign In</p>
        {/* <p className="text-xl p-0.5">
          Don&apos;t you have an account?&nbsp;
          <span className="underline text-gray-700 hover:text-black">
            <Link href="/accounts/sign_up">Sign Up</Link>
          </span>
        </p> */}
      </div>
      <button
        onClick={() => signInWithGoogle()}
        className="bg-blue-700 text-white mt-6 py-3.5 px-10 rounded-lg text-lg"
      >
        Sign In With Google
      </button>
    </div>
  )
}

export default SignIn
