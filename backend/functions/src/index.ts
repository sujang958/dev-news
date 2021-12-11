import cors = require("@koa/cors")
import { cert, initializeApp } from "firebase-admin/app"
import { Firestore } from "firebase-admin/firestore"
import * as functions from "firebase-functions"
import * as Koa from "koa"
import * as Router from "koa-router"
import bodyParser = require("koa-bodyparser")
import { auth } from "firebase-admin"

initializeApp({
  credential: cert(require("../service_account.json")),
})

const db = new Firestore()
const app = new Koa()
const router = new Router()
const users = db.collection("users")

router
  .get("/users/:id", async (ctx, next) => {
    const { id } = ctx.params
    if (!id) {
      ctx.status = 404
      ctx.body = JSON.stringify({
        code: 404,
        error: true,
        message: "user not found",
      })
      return
    }
    const user = users.where("email", "==", id)
    const { docs } = await user.limit(1).get()
    if (!docs[0]) {
      ctx.status = 404
      ctx.body = JSON.stringify({
        code: 404,
        error: true,
        message: "user not found",
      })
      return
    }
    ctx.status = 200
    ctx.body = JSON.stringify({
      code: 200,
      error: false,
      user: docs[0].data(),
    })
    return
  })
  .post("/users/:id", async (ctx, next) => {
    try {
      const { id: email } = ctx.params
      const { id, idToken } = ctx.request.body
      if (!email || !id || !idToken) {
        ctx.status = 418
        ctx.body = JSON.stringify({
          code: 418,
          error: true,
          message: "Your parameters do not satisfy my teapot",
        })
        return
      }
      await auth().verifyIdToken(idToken)
      const user = users.where("email", "==", email)
      const { docs } = await user.limit(1).get()
      const doc = docs[0]
      if (doc && doc.exists) {
        ctx.status = 418
        ctx.body = JSON.stringify({
          code: 418,
          error: true,
          message:
            "You are already have an account, so you cannot satisfy my teapot",
        })
        return
      }
      const userId = await users.doc(id).get()
      if (userId.exists) {
        ctx.status = 418
        ctx.body = JSON.stringify({
          code: 418,
          error: true,
          message: "Id already has been taken, so you cannot satisfy my teapot",
        })
        return
      }
      await users.doc(id).set({
        id,
        email,
        posts: [],
      })
      ctx.status = 200
      ctx.body = JSON.stringify({
        code: 200,
        error: false,
        message: "You satisfy my teapot, keep going on!",
      })
      return
    } catch (e) {
      console.log(e)
      ctx.status = 500
      ctx.body = JSON.stringify({
        code: 500,
        error: true,
        message: String(e),
      })
      return
    }
  })

function hybridBodyParser(opts = {}) {
  const bp = bodyParser(opts)
  return async (ctx: any, next: any) => {
    ctx.request.body = ctx.request.body || ctx.req.body
    return bp(ctx, next)
  }
}

app.use(cors())
app.use(hybridBodyParser()).use(router.routes()).use(router.allowedMethods())

export const accounts = functions
  .region("us-west1")
  .https.onRequest((req, res) => {
    res.setHeader("Content-Type", "application/json")
    app.callback()(req, res)
  })
