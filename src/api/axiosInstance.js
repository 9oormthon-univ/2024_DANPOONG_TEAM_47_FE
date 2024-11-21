// src/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_BASE_URL, // 환경변수에서 불러옴
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
