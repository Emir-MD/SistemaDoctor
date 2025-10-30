import axios from "axios";
import { forceLogout } from "@/context/authContext";


const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ej. http://localhost:5000/api
  timeout: 10000,
  withCredentials: true,               // true sólo si usas cookies
});

// Inyecta token en header
api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

// Manejo global de errores
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err.response?.status;
    if (status === 401) {
      forceLogout();
    }
    const msg =
      err.response?.data?.mensaje ||
      err.message ||
      "Error inesperado, inténtalo más tarde";
    return Promise.reject(msg);
  }
);


export default api;
