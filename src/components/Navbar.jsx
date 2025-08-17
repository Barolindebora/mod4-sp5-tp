import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa"; 

const Navbar = () => {
  return (
    <nav className="bg-blue-700 text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo o título */}
       <h1 className="text-xl font-bold flex items-center gap-2">
  <img
    src="/icons/portada.png"
    alt="Medalla"
    className="w-6 h-6 object-contain"
  />
  Club Gimnasia Cat - Proyecto Olímpico
</h1>

        {/* Links de navegación */}
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 hover:text-red-500 transition-colors"
          >
            <FaHome className="text-2xl" />
            <span className="hidden sm:inline">Home</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;