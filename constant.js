import axios from "axios";
const token = localStorage.getItem("auth-token");
export const Base_Url = "https://socialmediabackend-1.onrender.com";
// const url="https://social-media-backend-mocha-seven.vercel.app"
export const Apicall = axios.create({
  baseURL: `${Base_Url}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});

Apicall.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth-token");
    if (token) {
      config.headers["auth-token"] = token; // Dynamically set the auth-token header
    }
    return config;
  },
  (error) => {
    // Handle any errors
    console.log(error);
    return Promise.reject(error);
  }
);
