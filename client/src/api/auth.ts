import { ILogin } from "@/hooks/types";
import { api } from "@/hooks/use-axios";


export const loginRequest = ({username, password}: ILogin) => {
    return api.request({
        method: 'POST',
        data: { username, password },
        url: 'auth/login'
    });
}
