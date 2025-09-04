import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createAthlete } from "../services/athletesService";
import { useLanguage } from "../context/LanguageContext";

const AthleteForm = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();
  const { t } = useLanguage();

  const onSubmit = (data) => {
    // Transformar las medallas en objeto
    const newAthlete = {
      ...data,
      medals: {
        gold: data.gold ? Number(data.gold) : 0,
        silver: data.silver ? Number(data.silver) : 0,
        bronze: data.bronze ? Number(data.bronze) : 0,
      },
    };

    createAthlete(newAthlete);
    reset();
    navigate("/athletes-trampolin");
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-lg border-2 border-red-500">
      <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
        {t.createAthlete}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input
          {...register("name", { required: true })}
          placeholder={t.athleteName}
          className="border border-blue-500 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <input
          {...register("country", { required: true })}
          placeholder={t.athleteCountry}
          className="border border-blue-500 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <input
          {...register("club")}
          placeholder={t.athleteClub}
          className="border border-blue-500 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <input
          {...register("category", { required: true })}
          placeholder={t.athleteCategory}
          className="border border-blue-500 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <input
          {...register("level", { required: true })}
          placeholder={t.athleteLevel}
          className="border border-blue-500 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        {/* Disciplina restringida */}
        <select
          {...register("discipline", { required: "La disciplina es obligatoria" })}
          className="border border-blue-500 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value={t.trampoline}>{t.trampoline}</option>
          <option value={t.artisticFemale}>{t.artisticFemale}</option>
          <option value={t.artisticMale}>{t.artisticMale}</option>
        </select>

        <input
          {...register("apparatus")}
          placeholder={t.apparatus}
          className="border border-blue-500 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <input
          {...register("picture")}
          placeholder={t.picture}
          className="border border-blue-500 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <textarea
          {...register("description")}
          placeholder={t.description}
          className="border border-blue-500 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        {/* Medallas (no requerido) */}
        <div className="grid grid-cols-3 gap-2">
          <input
            {...register("gold")}
            type="number"
            placeholder="🥇 Oro"
            className="border border-yellow-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            {...register("silver")}
            type="number"
            placeholder="🥈 Plata"
            className="border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <input
            {...register("bronze")}
            type="number"
            placeholder="🥉 Bronce"
            className="border border-orange-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <button
          type="submit"
          className="bg-red-600 text-white font-bold py-2 rounded hover:bg-red-700 transition"
        >
          {t.createAthleteSubmit}
        </button>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500"
        >
          {t.cancel}
        </button>
      </form>
    </div>
  );
};

export default AthleteForm;