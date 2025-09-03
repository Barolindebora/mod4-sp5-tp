import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useLanguage } from "../context/LanguageContext";

const API_URL = "https://mod4-backend-final.onrender.com/api/auth/login"; // ajustá según tu back

const Login = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(API_URL, form);
      // Guardar token o datos en localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/"); // redirige al home o dashboard
    } catch (err) {
      setError(err.response?.data?.message || "Error en el login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {t.login || "Iniciar sesión"}
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          {/* Botón login */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {t.login || "Iniciar sesión"}
          </button>
        </form>

        {/* 👉 Link al registro */}
        <p className="text-center text-sm text-gray-600 mt-6">
          ¿No tenés usuario?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline font-medium"
          >
            Registrate ahora
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;