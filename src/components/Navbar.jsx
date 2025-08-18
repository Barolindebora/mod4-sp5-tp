import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="shadow-md font-sans">
      {/* Barra superior */}
      <div className="bg-gray-100 text-gray-800 text-sm py-2 px-4 flex justify-between items-center">
        <span className="font-semibold tracking-wide text-2xl"> Club Gimnasia Cat</span>

        <div className="flex items-center gap-4">
          <button className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full hover:bg-blue-200 transition">
            Iniciar sesión
          </button>

          <select className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none">
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
            Proyecto Olímpico
          </span>
        </h1>

        {/* Botón Home */}
        <Link
          to="/"
          className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-gray-600 transition"
        >
          <FaHome className="text-2xl" />
          <span className="hidden sm:inline">Home</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;