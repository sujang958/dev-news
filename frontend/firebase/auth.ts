import * as firebase from "firebase/app"
import {
  GoogleAuthProvider,
  getAuth,
  browserSessionPersistence,
  setPersistence,
} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAKkPXJ9XC5uYNIFIy4x0RM_r7l2RG5ROY",
  authDomain: "dev-news-s.firebaseapp.com",
  projectId: "dev-news-s",
  storageBucket: "dev-news-s.appspot.com",
  messagingSenderId: "968193007501",
  appId: "1:968193007501:web:f3322d34189e744e3fe7c4",
  measurementId: "G-V41S974JJR",
}

firebase.initializeApp(firebaseConfig)

export const auth = getAuth()
export const provider = new GoogleAuthProvider()

setPersistence(auth, browserSessionPersistence)
