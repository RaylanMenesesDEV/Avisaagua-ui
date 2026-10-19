
import axios from "axios";

// Instância HTTP compartilhada do AvisaÁgua
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Adicionar o token JWT às requisições autenticadas
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("avisaagua_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
