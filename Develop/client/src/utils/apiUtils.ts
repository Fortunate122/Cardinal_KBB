import axios from "axios";
import AuthService from "./auth";

const API = axios.create({ baseURL: "/api" });

API.interceptors.request.use((config) => {
  const token = AuthService.getToken();
  if (token) {
    // Ensure headers exist before assigning Authorization
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;