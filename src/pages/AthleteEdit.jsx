import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { getAthleteById, updateAthlete } from "../services/athletesService";
import { useLanguage } from "../context/LanguageContext";

const AthleteEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [athlete, setAthlete] = useState(null);

  const { t } = useLanguage();
  // Inicializo React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Cargo atleta por ID
  useEffect(() => {
    getAthleteById(id)
      .then((data) => {
        setAthlete(data);
        reset(data); // 👈 precarga los valores en el formulario
      })
      .catch(() => {
        console.error("Error al cargar el atleta");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, reset]);

  // Función para actualizar
  const onSubmit = async (formData) => {
    try {
      await updateAthlete(id, formData);
      navigate(-1); // Vuelve al detalle después de guardar
    } catch (error) {
      console.error("Error al actualizar atleta:", error);
    }
  };

  if (loading) return <p className="text-center">{t.loader}</p>;

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-2xl mt-10">
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
        {t.tituloEditar}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
       
       {/* Nombre (solo lectura) */}
      <div>
        <label className="block text-gray-700 font-semibold">{t.athleteName}</label>
        <input
         type="text"
           {...register("name")}
            className="w-full p-2 border rounded-lg bg-gray-100 cursor-not-allowed"
            readOnly
        />
      </div>

        {/* País */}
        <div>
          <label className="block text-gray-700 font-semibold">{t.athleteCountry}</label>
          <input
            type="text"
            {...register("country", { required: "El país es obligatorio" })}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Club */}
        <div>
          <label className="block text-gray-700 font-semibold">{t.athleteClub}</label>
          <input
            type="text"
            {...register("club")}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Categoría */}
        <div>
          <label className="block text-gray-700 font-semibold">{t.athleteCategory}</label>
          <input
            type="text"
            {...register("category")}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Nivel */}
        <div>
          <label className="block text-gray-700 font-semibold">{t.athleteLevel}</label>
          <input
            type="text"
            {...register("level")}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Disciplina */}
        <div>
          <label className="block text-gray-700 font-semibold">{t.discipline}</label>
          <select
          {...register("discipline", { required: "La disciplina es obligatoria" })}
          className="w-full p-2 border rounded-lg"
          >
            <option value={t.trampoline}>{t.trampoline}</option>
          <option value={t.artisticFemale}>{t.artisticFemale}</option>
          <option value={t.artisticMale}>{t.artisticMale}</option>
          </select>
        </div>

        {/* Aparato */}
        <div>
          <label className="block text-gray-700 font-semibold">{t.apparatus}</label>
          <input
            type="text"
            {...register("apparatus")}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Foto */}
        <div>
          <label className="block text-gray-700 font-semibold">{t.picture}</label>
          <input
            type="text"
            {...register("picture")}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-gray-700 font-semibold">{t.description}</label>
          <textarea
            {...register("description")}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Medallas */}
        <div>
          <label className="block text-gray-700 font-semibold">{t.medals}</label>
          <input
            type="number"
            {...register("medals")}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Botones */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500"
          >
           {t.cancel}
          </button>
          <button
            type="submit"
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
          >
            {t.saveChanges}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AthleteEdit;