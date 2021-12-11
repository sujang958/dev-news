import { GoogleAuthProvider, signInWithCredential } from "firebase/auth"
import { NextPage } from "next"
import Router from "next/router"
import { useCallback, useEffect, useState } from "react"
import { auth } from "../firebase/auth"
import API from "../utils/api"

const CreateAccount: NextPage<{ target: string }> = ({ target }) => {
  const [email, setEmail] = useState("Loading...")
  const [nick, setNick] = useState("")
  const handleCreate = useCallback(async () => {
    API.post(`/accounts/users/${email}`, {
      id: nick,
    })
      .then(({ data }) => {
        console.log(data)
        Router.push(target)
      })
      .catch((e) => {
        console.log(e)
        alert(String(e))
      })
  }, [email, nick, target])
  useEffect(() => {
    const idToken = localStorage.getItem("idToken")
    if (!idToken) Router.push("/")
    const crendential = GoogleAuthProvider.credential(idToken)
    signInWithCredential(auth, crendential)
      .then((userCredential) => {
        if (!userCredential.user.email) return Router.push("/")
        userCredential.user.getIdToken().then((nIdToken) => {
          localStorage.setItem("idToken", nIdToken)
          setEmail(String(userCredential.user.email))
        })
      })
      .catch((r) => {
        console.log(r)
        Router.push("/")
      })
  }, [])

  return (
    <div className="px-10 py-20">
      <div className="p-10">
        <p className="text-5xl font-bold">Create an account</p>
      </div>
      <div className="px-20 flex flex-row gap-4">
        <div className="flex-1 p-1">
          <p className="text-lg">Email</p>
          <input
            disabled={true}
            className="bg-gray-400 mx-2 rounded-lg py-2 px-4 min-w-full"
            value={email}
          />
        </div>
        <div></div>
        <div className="flex-1 p-1">
          <p className="text-lg">Set your nickname</p>
          <input
            value={nick}
            onChange={(e) => setNick(e.target.value)}
            className="mx-2 rounded-lg border border-black py-2 px-4 min-w-full"
          />
        </div>
      </div>
      <div className="px-16 pt-10">
        <button
          onClick={handleCreate}
          className=" bg-darkLightBlue font-bold text-white py-3.5 px-10 rounded-lg transition transform transform-gpu duration-200 hover:scale-110"
        >
          Done!
        </button>
      </div>
    </div>
  )
}

export default CreateAccount
