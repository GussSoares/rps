import { ILogin, IRegister } from "@/hooks/types";
import { api } from "@/services/api";

export const loginRequest = ({ username, password }: ILogin) => {
  return api.request({
    method: 'POST',
    data: { username, password },
    url: 'auth/token/'
  });
}

export const loginWithGoogleRequest = async (code: string) => {
  try {
    const response = await api.request({
      method: 'POST',
      data: { code },
      url: 'auth/login/google'
    });
    return response.data;
  } catch (err: any) {
    if (err.response) {
      throw new Error(`Erro ${err.response.status}`);
    }
    throw new Error(`Ocorreu um erro inesperado.`);
  }
}

export const registerRequest = ({
  firstname,
  lastname,
  username,
  email,
  password,
  confirmPassword
}: IRegister) => {
  return api.request({
    method: 'POST',
    data: {
      username,
      first_name: firstname,
      last_name: lastname,
      email,
      password,
      confirm_password: confirmPassword
    },
    url: 'auth/register/'
  });
}

export const refreshTokenRequest = async () => {
  const response = await api.request({
    method: 'POST',
    data: { refresh: localStorage.getItem('refreshToken') },
    url: 'auth/token/refresh/',
    headers: {}
  });
  return response.data
}

export const logoutRequest = () => {
  return api.request({
    method: 'POST',
    data: { refresh: localStorage.getItem('refreshToken') },
    url: 'auth/logout/'
  })
}

export const userRequest = async () => {
  const response = await api.request({
    method: 'GET',
    url: 'auth/user/'
  });
  return response.data;
}