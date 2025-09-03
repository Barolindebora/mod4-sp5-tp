import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// 👉 Ajustá esta URL a tu backend en Render
const API_URL = "https://mod4-backend-final.onrender.com";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // datos del usuario
  const [token, setToken] = useState(null); // JWT
  const [loading, setLoading] = useState(true);

  // 🗂️ Cuando la app carga, revisa si hay token guardado
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // 🔑 Login
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });

      const { token, user } = res.data;

      // Guarda en estado y localStorage
      setToken(token);
      setUser(user);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      return true;
    } catch (error) {
      console.error("Error en login:", error.response?.data || error.message);
      return false;
    }
  };

  // 🚪 Logout
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // 👤 Obtener perfil (ej: /users/me)
  const fetchProfile = async () => {
    if (!token) return;

    try {
      const res = await axios.get(`${API_URL}/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (error) {
      console.error("Error al obtener perfil:", error.response?.data || error.message);
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, fetchProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar en cualquier componente
export const useAuth = () => useContext(AuthContext);