import axios from "axios";

export const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    // authorization: `Bearer ${document.cookie.split('=')[1]}`
  }
  
});
