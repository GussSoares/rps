
type IHeaders = {
  Authorization: string,
}

type IRequest = {
  url: string,
  method: string,
  headers: IHeaders | undefined,
  params: Object | undefined,
  body: Object | undefined
}

type ILogin = {
  username: string,
  password: string
}

type IRefreshToken = {
  refreshToken: string;
}

type IRegister = {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type IUser = {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  is_superuser: boolean;
}

export type {
  IRequest,
  ILogin,
  IRefreshToken,
  IRegister,
  IUser
};
