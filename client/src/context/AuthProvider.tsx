import { loginRequest, logoutRequest } from "@/services/auth";
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

type UserContextType = {
	token: string | null;
	login: (username: string, password: string) => void;
	logout: () => void;
	isLogged: boolean;
	loading: boolean;
};

const UserContext = createContext<UserContextType>({} as UserContextType);

type Props = { children: ReactNode };

export const UserProvider = ({ children }: Props) => {
	const [token, setToken] = useState<string | null>(localStorage.getItem("accessToken") || '');
	// const [refresh, setRefresh] = useState<string | null>(localStorage.getItem("refreshToken") || '');
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		if (isLogged) return

		if (!window.location.href.includes('/login')) {
			window.location.assign("/login");
		}
	}, [])

	// const register = (email: string, username: string, password: string) => {

	const login = (username: string, password: string) => {
		setLoading(true);
		loginRequest({ username, password })
			.then(res => {
				localStorage.setItem("accessToken", res.data.access);
				localStorage.setItem("refreshToken", res.data.refresh);
				setToken(res.data.access);
				// setRefresh(res.data.refresh)
				toast.success("Login Successed!", { position: 'top-center', richColors: true });
			})
			.catch(err => {
				toast.error(err.response.data.message, { position: 'top-center', richColors: true });
			})
			.finally(() => {
				setLoading(false);
				// window.location.assign("/");
			})
	}

	const logout = () => {
		logoutRequest()
		.then(() => {
			localStorage.removeItem("accessToken");
			localStorage.removeItem("refreshToken");
			setToken(null);
			// setRefresh(null);
			toast.warning("Deslogado com sucesso", {
				richColors: true,
				position: "top-center"
			})
			// window.location.assign("/login");
		})
		.catch(err => {
			toast.error(err.response.data.message, { position: 'top-center', richColors: true });
		})
	}

	const isLogged = useMemo(() => {
		return !!token;
	}, [token]);

	return (
		<UserContext.Provider value={{ login, logout, token, isLogged, loading }}>
			{children}
		</UserContext.Provider>
	)
}

export const useAuth = () => useContext(UserContext);
