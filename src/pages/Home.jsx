import { useNavigate } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 bg-white text-center p-4">
       {/* Imagen centrada */}
      <img 
        src="/icons/portada.png"
        alt="Logo gimnasia"
        className="w-40 h-40 object-contain"
      />

   
      <p className="text-lg text-gray-700">Elegí la disciplina para continuar</p>

      <div className="flex flex-col gap-6 w-full max-w-sm">
        <button
          onClick={() => navigate("/athletes-trampolin")}
          className="bg-blue-700 text-white py-3 px-6 rounded-xl shadow-lg hover:bg-blue-800 transition"
        >
          Gimnasia de Trampolín
        </button>

        <button
          onClick={() => navigate("/artistica")}
          className="bg-red-600 text-white py-3 px-6 rounded-xl shadow-lg hover:bg-red-700 transition"
        >
          Gimnasia Artística Femenina 
        </button>

        <button
          onClick={() => navigate("/parkour")}
          className="bg-gray-900 text-white py-3 px-6 rounded-xl shadow-lg hover:bg-black transition"
        >
         Gimnasia Artística Masculina
        </button>
      </div>
        {/* Botón para agregar un atleta */}
            <button
              onClick={() => navigate("/athletes/new")}
              className="mt-2 bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-blue-950 
                         text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300"
            >
              ➕ Add Athlete
            </button>

    </div>
  );
};

export default Home;