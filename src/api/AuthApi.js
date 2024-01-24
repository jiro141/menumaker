import axios from "axios";
// const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Axios = axios.create({
  baseURL: `http://localhost:5000`,
  headers: { "content-type": "application/json" },
});

Axios.interceptors.request.use(async (config) => {
  const token = window.localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

export default Axios;
