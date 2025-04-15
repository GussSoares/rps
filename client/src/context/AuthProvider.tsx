import { loginRequest } from "@/api/auth";
import { api } from "@/hooks/use-axios";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type UserContextType = {
	token: string | null;
	login: (username: string, password: string) => void;
	logout: () => void;
	isLogged: () => boolean;
	loading: boolean;
};

const UserContext = createContext<UserContextType>({} as UserContextType);

type Props = { children: ReactNode };

export const UserProvider = ({ children }: Props) => {
	const [token, setToken] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [isReady, setIsReady] = useState<boolean>(false);
	// const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("token");

		if (token) {
			setToken(token);
			api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
			// navigate("/");
		} else {
			// navigate("/login");
		}

		setIsReady(true);
	}, [])

	// const register = (email: string, username: string, password: string) => {

	const login = (username: string, password: string) => {
		setLoading(true);
		loginRequest({ username, password })
			.then(res => {
				localStorage.setItem("token", res.data.token);
				setToken(res.data.token);
				toast.success("Login Successed!", {position: 'top-center', richColors: true});
			})
			.catch(err => {
				toast.error(err.response.data.message, {position: 'top-center', richColors: true});
			})
			.finally(() => {
				setLoading(false);
				// navigate("/");
			})
	}

	const logout = () => {
		localStorage.removeItem("token");
		setToken(null);
		// navigate("/login");
	}

	const isLogged = () => {
		return !!token;
	}

	return (
		<UserContext.Provider value={{ login, logout, token, isLogged, loading }}>
			{isReady ? children : null}
		</UserContext.Provider>
	)
}

export const useAuth = () => useContext(UserContext);
