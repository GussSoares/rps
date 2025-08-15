import axios from "axios";
import { toast } from "sonner";
import { refreshTokenRequest } from "./auth";
import { string } from "zod";

export const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v0',
  headers: {
    'Accept': '*/*',
    'Content-Type': 'application/json',
  }
})

api.interceptors.request.use(async (request) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config;

    const forceLogout = () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.assign("/login");
      toast.error("Token inválido")
    }

    let refreshToken = localStorage.getItem("refreshToken");
    if (error?.response?.status === 401 && refreshToken && !originalRequest._retry) {
      originalRequest._retry = true;

      if (originalRequest.url.includes('auth/token/refresh/')) {
        forceLogout()
      } else {

        const response = await refreshTokenRequest();

        if (response) {
          const { access, refresh } = response;
          localStorage.setItem("accessToken", access);
          localStorage.setItem("refreshToken", refresh);
          originalRequest.headers["authorization"] = `Bearer ${access}`;
          return api(originalRequest);
        } else {
          forceLogout()
        }
      }
    } else {
      let message = '';
      if (error?.response?.message instanceof Array) {
        message = error?.response?.message[0]
      } else if (error?.response?.message instanceof string) {
        message = error?.response?.message
      } else if (error?.response?.status == 404) {
        message = "Recurso não encontrado"
      } else if (error?.response?.status == 403) {
        message = "Acesso proibido"
      } else if (error?.response?.status == 500) {
        message = "Ocorreu um erro inesperado"
      }
      toast.error("Error", {
        description: message
      })
    }
    return Promise.reject(error);
  }
)