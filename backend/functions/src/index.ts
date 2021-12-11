import { cert, initializeApp } from "firebase-admin/app"
import { Firestore } from "firebase-admin/firestore"
import * as functions from "firebase-functions"
import * as Koa from "koa"
import koaBody = require("koa-body")
import * as Router from "koa-router"

initializeApp({
  credential: cert(require("../service_account.json")),
})

const db = new Firestore()
const app = new Koa()
const router = new Router()

router.get("/users/:id", async (ctx, next) => {
  const { id } = ctx.params
  if (!id) {
    ctx.status = 404
    ctx.body = JSON.stringify({
      code: 404,
      err: true,
      message: "user not found",
    })
    ctx.res.end()
    return next()
  }
  const user = db.collection("users").doc(id)
  const doc = await user.get()
  if (!doc.exists) {
    ctx.status = 404
    ctx.body = JSON.stringify({
      code: 404,
      err: true,
      message: "user not found",
    })
    ctx.res.end()
    return next()
  }
  ctx.status = 200
  ctx.body = JSON.stringify({
    code: 200,
    err: false,
    user: doc.data(),
  })
  ctx.res.end()
  return next()
})
router.post("/users/:id", async (ctx, next) => {
  const { id } = ctx.params
  const { id: uid } = ctx.request.body
  console.log(id, uid)
  if (!id || !uid) {
    ctx.status = 404
    ctx.body = JSON.stringify({
      code: 404,
      err: true,
      message: "user not found",
    })
    ctx.res.end()
    return next()
  }
  console.log("start adding")
  const user = db.collection("users").doc(id)
  console.log("start adding")
  const doc = await user.get()
  if (doc.exists) {
    ctx.status = 400
    ctx.body = JSON.stringify({
      code: 400,
      err: true,
      message: "user already exits",
    })
    ctx.res.end()
    return next()
  }
  console.log("start adding")
  await db.collection("users").doc(uid).set({
    email: id,
    id: uid,
    posts: [],
  })
  console.log("end adding")
  ctx.status = 200
  ctx.body = JSON.stringify({
    code: 200,
    err: false,
  })
  ctx.res.end()
  return next()
})

app.use(koaBody()).use(router.routes()).use(router.allowedMethods())

export const accounts = functions
  .region("us-west1")
  .https.onRequest((req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "*")
    res.setHeader("Content-Type", "application/json")
    app.callback()(req, res)
  })
