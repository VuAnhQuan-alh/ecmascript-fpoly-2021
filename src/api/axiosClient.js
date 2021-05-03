import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "http://localhost:8686",
  headers: {
    'Content-Type': 'application/json',
  }
})