import axios from "axios";

const axiosInstance = axios.create({
  //  baseURL: "http://localhost:3000/api",
  baseURL: "https://evangadiforum-1-m1vk.onrender.com/api"

});

export default axiosInstance;
