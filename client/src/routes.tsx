import { Navigate } from "react-router";
import App from "./App";
import { useAuth } from "./context/AuthProvider";

export const ProtectedRoutes = () => {
  const { isLogged } = useAuth();

	return isLogged ? <App /> : <Navigate to="/login" replace />;
};