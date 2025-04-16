
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

export type {
    IRequest,
    ILogin,
    IRefreshToken
};
