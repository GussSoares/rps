import { useAuth } from "./context/AuthProvider";
import App from "./App";
import { Navigate } from "react-router-dom";

export const ProtectedRoutes = () => {
	const { isLogged } = useAuth();

	return isLogged ? <App /> : <Navigate to="/login" replace />;
};