import axios from "axios";

const api = axios.create({
  baseURL: "https://pidhrodrigohuertos-production.up.railway.app/api",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Intercepta las solicitudes y agrega el token JWT
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token"); // Obtener el token almacenado
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Agregar el token al encabezado
  }
  return config;
});

export default api;