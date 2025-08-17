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
    </div>
  );
};

export default Home;