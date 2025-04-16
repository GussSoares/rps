import { ILogin } from "@/hooks/types";
import { api } from "@/services/api";

export const loginRequest = ({ username, password }: ILogin) => {
    return api.request({
        method: 'POST',
        data: { username, password },
        url: 'auth/token'
    });
}

export const refreshTokenRequest = () => {
    return api.request({
        method: 'POST',
        data: { refresh: localStorage.getItem('refreshToken') },
        url: 'auth/token/refresh',
    });
}

// export const refreshTokenRequest = async () => {
//   try {
//     const response = await api.request({
//       method: 'POST',
//       data: { refresh: localStorage.getItem('refreshToken') },
//       url: 'auth/token/refresh',
//     });
//     return response.data
//   } catch (err) {
//     console.log(err)
//     toast.error("Ocorreu um erro", {richColors: true, position: "top-center"})
//   }  
// }

export const logoutRequest = () => {
    return api.request({
        method: 'POST',
        data: { refresh: localStorage.getItem('refreshToken') },
        url: 'auth/logout'
    })
}

export const userRequest = () => {
    return api.request({
        method: 'GET',
        url: 'auth/user'
    })
}