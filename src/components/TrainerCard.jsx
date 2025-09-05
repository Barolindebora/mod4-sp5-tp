import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const TrainerCard = ({ trainer }) => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="bg-white border-2 border-blue-700 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 flex flex-col items-center text-center">
      {/* Imagen del entrenador */}
      <img
        src={trainer.picture || "https://via.placeholder.com/150x150?text=Sin+foto"}
        alt={trainer.name}
        className="w-32 h-32 object-cover rounded-full border-4 border-red-600 mb-4"
      />

      {/* Nombre */}
      <h2 className="text-xl font-bold text-red-600">{trainer.name}</h2>

      {/* Especialidad */}
      <p className="text-blue-700 font-medium">{trainer.especialidad}</p>

      {/* Botón de detalle */}
      {/*<button
        onClick={() => navigate(`/trainers/${trainer._id}`)}
        className="bg-green-600 text-white py-3 px-6 rounded-xl shadow-lg hover:bg-green-800 transition mt-3"
      >
        {t.details || "Ver Perfil"}
      </button>*/}
    </div>
  );
};

export default TrainerCard;