import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://medium-cf-worker.ttahm3d.workers.dev/api/v1",
});

export default axiosInstance;
