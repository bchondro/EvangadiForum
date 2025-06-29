import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://evangadiforum-1-m1vk.onrender.com/api"
});

export default axiosInstance;
