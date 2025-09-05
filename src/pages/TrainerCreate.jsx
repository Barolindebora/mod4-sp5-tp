import { useForm } from "react-hook-form";
import { useTrainers } from "../context/TrainerContext";
import { useAuth } from "../context/AuthContext"; // 👈 IMPORTANTE
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const TrainerCreate = () => {
  const { createTrainer } = useTrainers();
  const { user } = useAuth(); // 👈 ahora sí tenés acceso al user logueado
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const trainerData = {
        ...data,
        owner: user?._id, // 👈 usamos el id del usuario logueado
      };

      await createTrainer(trainerData);
      Swal.fire("Éxito", "Entrenador creado correctamente", "success");
      reset();
      navigate(-1);
    } catch (error) {
      Swal.fire("Error", "No se pudo crear el entrenador", "error");
      console.error(error);
    }
   
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Crear Entrenador</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Nombre */}
        <div>
          <label className="block font-semibold">Nombre</label>
          <input
            type="text"
            {...register("name", { required: "El nombre es obligatorio" })}
            className="w-full border p-2 rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* País */}
        <div>
          <label className="block font-semibold">País</label>
          <input
            type="text"
            {...register("country", { required: "El país es obligatorio" })}
            className="w-full border p-2 rounded"
          />
          {errors.country && (
            <p className="text-red-500 text-sm">{errors.country.message}</p>
          )}
        </div>

        {/* Especialidad */}
        <div>
          <label className="block font-semibold">Especialidad</label>
          <input
            type="text"
            {...register("especialidad", { required: "La especialidad es obligatoria" })}
            className="w-full border p-2 rounded"
          />
          {errors.especialidad && (
            <p className="text-red-500 text-sm">{errors.especialidad.message}</p>
          )}
        </div>

        {/* Experiencia */}
        <div>
          <label className="block font-semibold">Años de experiencia</label>
          <input
            type="number"
            {...register("experiencia", {
              required: "La experiencia es obligatoria",
              min: { value: 0, message: "Debe ser un número positivo" },
            })}
            className="w-full border p-2 rounded"
          />
          {errors.experiencia && (
            <p className="text-red-500 text-sm">{errors.experiencia.message}</p>
          )}
        </div>

        {/* Club */}
        <div>
          <label className="block font-semibold">Club</label>
          <input
            type="text"
            {...register("club")}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Foto */}
        <div>
          <label className="block font-semibold">Foto (URL)</label>
          <input
            type="url"
            {...register("picture")}
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Crear Entrenador
        </button>
      </form>
    </div>
  );
};

export default TrainerCreate;