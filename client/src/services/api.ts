import axios from "axios";
import { toast } from "sonner";
import { refreshTokenRequest } from "./auth";


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
    let refreshToken = localStorage.getItem("refreshToken");
    const originalRequest = error.config;

    if (error?.response?.status === 401 && refreshToken && !originalRequest._retry) {
      originalRequest._retry = true;

      // const response = await refreshTokenRequest();

      // debugger;
      // if (response) {
      //   console.log(response);
      //   const { access, refresh } = response;
      //   localStorage.setItem("accessToken", access);
      //   localStorage.setItem("refreshToken", refresh);
      //   originalRequest.headers["authorization"] = `Bearer ${access}`;
      //   return api(originalRequest);
      // } else {
      //   localStorage.removeItem("accessToken");
			//   localStorage.removeItem("refreshToken");
      //   window.location.assign("/login");
      // }

      return refreshTokenRequest()
        .then((res) => {
          localStorage.setItem("accessToken", res.data.access);
          localStorage.setItem("refreshToken", res.data.refresh);
          originalRequest.headers['Authorization'] = `Bearer ${res.data.access}`;
          return api(originalRequest);
        })
        .catch(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          window.location.assign("/login");
          toast.error("Token inválido", {
            position: "top-center",
            richColors: true
          })
        })
    }
    return Promise.reject(error);
  }
)