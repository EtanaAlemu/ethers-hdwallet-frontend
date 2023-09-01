// utilities/axios.js
import axios from "axios";

export const API = axios.create({
  // You can set default base URL, headers, timeouts, etc. here
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});
