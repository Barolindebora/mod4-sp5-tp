import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getAthleteById } from "../services/athletesService";

const AthleteDetail = () => {
  const { id } = useParams();
  const [athlete, setAthlete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-2xl border-2 border-blue-700 mt-10">
      <div className="flex flex-col items-center text-center">
        {/* Imagen cuadrada */}
        <img
          src={athlete.image}
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

        {/* Descripción */}
        <p className="text-gray-700 text-lg leading-relaxed max-w-2xl mb-6">
          {athlete.description}
        </p>

        {/* Medallero si existe */}
        {athlete.medals && (
          <div className="bg-yellow-100 border border-yellow-400 rounded-xl p-4 mb-6 shadow-md">
            <h2 className="text-xl font-bold text-yellow-700 mb-2">
              🏅 Medallero
            </h2>
            <ul className="flex justify-center gap-6 text-lg">
              <li> 🏅Total de medallas {athlete.medals || 0} </li>
              {/*<li>🥈 {athlete.medals.silver || 0} Plata</li>
              <li>🥉 {athlete.medals.bronze || 0} Bronce</li>*/}
            </ul>
          </div>
        )}

        {/* Botón de volver */}
        <button onClick={() => navigate(-1)} className="mt-4 bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-blue-950 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300">
          ⬅ Volver
        </button>
      </div>
    </div>
  );
};

export default AthleteDetail;