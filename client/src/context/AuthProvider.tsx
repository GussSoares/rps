import { IRegister, IUser } from "@/hooks/types";
import { loginRequest, loginWithGithubRequest, loginWithGoogleRequest, logoutRequest, registerRequest, userRequest } from "@/services/auth";
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

type UserContextType = {
	token: string | null;
	user: IUser | null;
	login: (username: string, password: string) => Promise<any>;
	loginWithGoogle: (code: string) => Promise<any>;
	loginWithGithub: (code: string) => Promise<any>;
	register: (data: IRegister) => Promise<any>;
	logout: () => void;
	setUser: (data: IUser) => void;
	isLogged: boolean;
	loading: boolean;
};

const UserContext = createContext<UserContextType>({} as UserContextType);

type Props = { children: ReactNode };

export const UserProvider = ({ children }: Props) => {
	const [token, setToken] = useState<string | null>(localStorage.getItem("accessToken") || '');
	const [user, setUser] = useState<IUser | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		if (isLogged) {
			if (!user) {
				getUserData()
			}
			return
		}

		if (!window.location.href.includes('/login')) {
			window.location.assign("/login");
		}
	}, [user])

	const register = async (data: IRegister) => {
		setLoading(true);
		return await registerRequest(data)
			.then(() => {
				toast.success("Register Successed!");
			})
			.catch(err => {
				if (err.response.status === 400) {
					toast.error(JSON.stringify(err.response.data));
				} else {
					toast.error("Ocorreu um erro inesperado.");
				}
			})
			.finally(() => {
				setLoading(false);
			})
	}

	const login = async (username: string, password: string) => {
		setLoading(true);
		return await loginRequest({ username, password })
			.then(res => {
				localStorage.setItem("accessToken", res.data.access);
				localStorage.setItem("refreshToken", res.data.refresh);
				setToken(res.data.access);
				getUserData()
				toast.success("Login Successed!");
			})
			.catch(err => {
				toast.error(err.response.data.message);
			})
			.finally(() => {
				setLoading(false);
				// window.location.assign("/");
			})
	}

	const logout = async () => {
		return await logoutRequest()
			.then(() => {
				localStorage.removeItem("accessToken");
				localStorage.removeItem("refreshToken");
				setToken(null);
				// setRefresh(null);
				toast.warning("Deslogado com sucesso")
				// window.location.assign("/login");
			})
			.catch(err => {
				toast.error(err.response.data.message);
			})
	}

	const loginWithGoogle = async (code: string) => {
		try {
			setLoading(true);
			const data = await loginWithGoogleRequest(code);
			localStorage.setItem("accessToken", data.access);
			localStorage.setItem("refreshToken", data.refresh);
			setToken(data.access);
			getUserData()
			toast.success("Login Successed!");

		} catch (err: any) {
			console.log(err);
			toast.error(err.response.data.message);
		} finally {
			setLoading(false);
		}
	}

	const loginWithGithub = async (code: string) => {
		try {
			setLoading(true);
			const data = await loginWithGithubRequest(code);
			localStorage.setItem("accessToken", data.access);
			localStorage.setItem("refreshToken", data.refresh);
			setToken(data.access);
			getUserData()
			toast.success("Login Successed!");

		} catch (err: any) {
			console.log(err);
			toast.error(err.response.data.message);
		} finally {
			setLoading(false);
		}
	}

	const getUserData = async () => {
		const userData = await userRequest();
		setUser({ ...userData })
	}

	const isLogged = useMemo(() => {
		return !!token;
	}, [token]);

	return (
		<UserContext.Provider value={{ login, logout, register, token, isLogged, loading, user, loginWithGoogle, loginWithGithub, setUser }}>
			{children}
		</UserContext.Provider>
	)
}

export const useAuth = () => useContext(UserContext);
