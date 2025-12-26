import axios from "axios";

console.log("AXIOS BASE URL =", process.env.NEXT_PUBLIC_API_URL);

const api = axios.create({
  baseURL: "http://localhost:4040",
});

export default api;
