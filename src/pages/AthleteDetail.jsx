import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getAthleteById } from "../services/athletesService";
import { deleteAthlete } from "../services/athletesService";
import Swal from "sweetalert2";
import{useLanguage} from "../context/LanguageContext"

const AthleteDetail = () => {
  const { id } = useParams();
  const [athlete, setAthlete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    getAthleteById(id)
      .then((data) => {
        setAthlete(data);
      })
      .catch(() => {
        setError("Error loading athlete details.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return <p className="text-center text-blue-700 text-lg">Loading...</p>;
  if (error)
    return <p className="text-center text-red-600 text-lg">{error}</p>;
  if (!athlete) return navigate("/not-found");

const handleDelete = () => {
  Swal.fire({
    title: `${t.askConfirm} ${athlete.name}?`,
    text: t.deleteWarning,
    imageUrl: athlete.picture,   // 👈 mostramos la foto del atleta
    imageWidth: 200,             // ancho de la imagen
    imageHeight: 200,            // alto de la imagen
    imageAlt: `Foto de ${athlete.name}`, // texto alternativo
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: t.confirmButton,
    cancelButtonText: t.cancelButton,
  }).then((result) => {
    if (result.isConfirmed) {
      deleteAthlete(id);
      Swal.fire(
        t.deleted,
        t.deleteMessage,
        t.success,
      );
      navigate(-1);
    }
  });
};
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-2xl border-2 border-blue-700 mt-10">
      <div className="flex flex-col items-center text-center">
        {/* Imagen cuadrada */}
        <img
          src={athlete.picture}
          alt={athlete.name}
          className="w-60 h-60 object-cover rounded-lg border-4 border-red-600 shadow-md mb-6"
        />

        {/* Nombre y disciplina */}
        <h1 className="text-4xl font-extrabold text-red-600 mb-2">
          {athlete.name}
        </h1>
        <p className="text-xl text-blue-700 font-medium mb-4">
          {athlete.discipline}
        </p>
        <p className="text-xl text-blue-700 font-medium mb-4">{t.apparatus}: {athlete.apparatus}

        </p>

        {/* Descripción */}
        <p className="text-gray-700 text-lg leading-relaxed max-w-2xl mb-6">
          {athlete.description}
        </p>

        {/* Medallero si existe */}
        {athlete.medals && (
          <div className="bg-yellow-100 border border-yellow-400 rounded-xl p-4 mb-6 shadow-md">
            <h2 className="text-xl font-bold text-yellow-700 mb-2">
              🏅 {t.medallero}
            </h2>
            <ul className="flex justify-center gap-6 text-lg">
              <li> 🏅{t.totalMedallas} {athlete.medals || 0} </li>
              {/*<li>🥈 {athlete.medals.silver || 0} Plata</li>
              <li>🥉 {athlete.medals.bronze || 0} Bronce</li>*/}
            </ul>
          </div>
        )}

       <div className="flex  items-center gap-4"> 
       { /* Botón editar */ }

        <button onClick={() => navigate(`/athletes/${athlete.id}/edit`)}  title={t.tituloEditar} className="mt-4 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300">
          ✏️ 
        </button>
       
        {/* Botón de eliminar */}
       <button
            onClick={handleDelete}
            title={t.tituloEliminar}
            className="mt-4 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300"
          >
            🗑️
          </button>
         {/* Botón de volver */}
        <button onClick={() => navigate(-1)} title={t.tituloVolver} className="mt-4 bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-blue-950 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300">
          ⬅ 
        </button>
        </div>
      </div>
    </div>
  );
};

export default AthleteDetail;