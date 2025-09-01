import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const AthleteCard = ({ athlete }) => {
  const navigate = useNavigate(); // 👈 ahora sí tenemos navigate
  const { t } = useLanguage();

  return (
    <div className="bg-white border-2 border-blue-700 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-4 flex flex-col items-center text-center">
      {/* Imagen del atleta */}
      <img
        src={athlete.picture}
        alt={athlete.name}
        className="w-32 h-32 object-cover rounded-full border-4 border-red-600 mb-4"
      />

      {/* Nombre */}
      <h2 className="text-xl font-bold text-red-600">{athlete.name}</h2>

      {/* Deporte / especialidad */}
      <p className="text-blue-700 font-medium">{athlete.discipline}</p>

      {/* Botón de detalle */}
      <button
        onClick={() => navigate(`/athletes-trampolin/${athlete._id}`)}
        className="bg-red-600 text-white py-3 px-6 rounded-xl shadow-lg hover:bg-blue-900 transition"
      >
        {t.details}
      </button>
    </div>
  );
};

export default AthleteCard;