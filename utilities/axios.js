// utilities/axios.js
import axios from "axios";

const host = process.env.NEXT_PUBLIC_API_HOST
const port = process.env.NEXT_PUBLIC_API_PORT

export const API = axios.create({
  // You can set default base URL, headers, timeouts, etc. here
  headers: {
    Authorization : `Bearer ${localStorage.getItem("access_token")}`
    },
  baseURL: `http://${host}:${port}/api`,
  timeout: 10000,
});
