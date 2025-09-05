import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext"; // 👈 Importamos Auth

const Navbar = () => {
  const { language, t, toggleLanguage } = useLanguage();
  const { user, logout } = useAuth(); // 👈 accedemos a user y logout
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // limpia token + user del context/localStorage
    navigate("/login"); // redirige al login después de logout
  };

  return (
    <nav className="shadow-md font-sans">
      {/* Barra superior */}
      <div className="bg-gray-100 text-gray-800 text-sm py-2 px-4 flex justify-between items-center">
        <span className="font-semibold tracking-wide text-2xl">
          CLUB GIMNASIA C
        </span>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              {/* Link a Mi Perfil */}
              <Link
                to="/mi-profile"
                className="bg-green-100 text-green-800 px-3 py-1 rounded-full hover:bg-green-200 transition"
              >
                {t.miPerfil}
              </Link>

              {/* 👇 Link solo visible para administradores */}
              {user.role === "admin" && (
                <Link
                  to="/admin/users"
                  className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full hover:bg-purple-200 transition"
                >
                  {t.userAdmin}
                </Link>
              )}

              {/* Botón Logout */}
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            // Botón de Login si NO hay usuario
            <Link
              to="/login"
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full hover:bg-blue-200 transition"
            >
              {t.login}
            </Link>
          )}

          {/* Selector de idioma */}
          <select
            value={language}
            onChange={toggleLanguage}
            className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none"
          >
            <option value="es">Español</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="bg-gray-700 text-white py-3 px-4 flex justify-between items-center">
        {/* Logo + título */}
        <h1 className="text-xl font-extrabold flex items-center gap-2 tracking-wide">
          <img
            src="/icons/olympic.png"
            alt="Logo Olímpico"
            className="w-8 h-8 object-contain"
          />
          <span className="bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
            {t.projectTitle}
          </span>
        </h1>

        {/* Botón Home */}
        <Link
          to="/"
          className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-600 transition"
        >
          <FaHome className="text-2xl" />
          <span className="hidden sm:inline">{t.home}</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;