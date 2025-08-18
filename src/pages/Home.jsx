import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 bg-white text-center p-6">
      
      {/* Logo */}
      <img 
        src="/icons/portada.png"
        alt="Logo gimnasia"
        className="w-40 h-40 object-contain transition-transform duration-300 hover:scale-105"
      />

      {/* Título */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 relative">
        Elegí la disciplina para continuar
        <span className="block w-20 h-1 bg-gradient-to-r from-blue-500 to-red-500 mx-auto mt-2 rounded-full"></span>
      </h2>

      {/* Botones disciplinas */}
      <div className="flex flex-col gap-6 w-full max-w-sm">
        <button
          onClick={() => navigate("/athletes-trampolin")}
          className="bg-blue-700 text-white py-3 px-6 rounded-2xl shadow-lg hover:bg-blue-800 transition font-semibold"
        >
          Gimnasia de Trampolín
        </button>

        <button
          onClick={() => navigate("/artistica")}
          className="bg-red-600 text-white py-3 px-6 rounded-2xl shadow-lg hover:bg-red-700 transition font-semibold"
        >
          Gimnasia Artística Femenina
        </button>

        <button
          onClick={() => navigate("/parkour")}
          className="bg-gray-900 text-white py-3 px-6 rounded-2xl shadow-lg hover:bg-black transition font-semibold"
        >
          Gimnasia Artística Masculina
        </button>
      </div>

      {/* Botón Add Athlete */}
      <button
        onClick={() => navigate("/athletes/new")}
        className="flex items-center gap-2 mt-4 bg-gradient-to-r from-blue-700 to-blue-900 
                   hover:from-blue-800 hover:to-blue-950 text-white px-6 py-3 rounded-2xl 
                   shadow-md hover:shadow-lg transition-all duration-300 font-semibold"
      >
        <FaPlus /> Add Athlete
      </button>
    </div>
  );
};

export default Home;