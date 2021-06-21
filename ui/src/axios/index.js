import axios from "axios";

const baseURL = "http://localhost:2000/api/v1";

const mainAPIInstance = axios.create({
  baseURL,
});

mainAPIInstance.interceptors.request.use((config) => {
  if (
    !config?.url.includes("/register") &&
    !config?.url.includes("/activate")
  ) {
    const auth_token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${auth_token}`;
  }
  return config;
});

export default mainAPIInstance;
