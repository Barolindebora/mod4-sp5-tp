import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // No logueado → redirige al login
    return <Navigate to="/login" />;
  }

  if (user.role !== "admin") {
    // No es admin → redirige a home o perfil
    return <Navigate to="/" />;
  }

  return children; // Es admin → renderiza contenido
};

export default AdminRoute;