import axios from "axios"

const API = axios.create({
  baseURL: "http://localhost:5001/dev-news-s/us-west1",
})

export default API
