import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8001/api",
    withCredentials: true,
});
// export const axiosInstance = axios.create({
//     baseURL: import.meta.env.MODE === "development" ? "http://localhost:8001/api" : "/api",
//     withCredentials: true,
// });