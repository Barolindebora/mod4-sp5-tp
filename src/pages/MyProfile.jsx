import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import { useLanguage } from "../context/LanguageContext";

const MyProfile = () => {
  const { user, token } = useAuth();
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const API_URL = "https://mod4-backend-final.onrender.com/api";

  useEffect(() => {
    const fetchPerfil = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      console.log("🔎 USER en MyProfile:", user);

      try {
        let url = "";
        if (user.role === "atleta") {
          url = `${API_URL}/athletes/me`;
        } else if (user.role === "entrenador") {
          url = `${API_URL}/trainers/me`;
        }

        if (!url) {
          setLoading(false);
          return;
        }

        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        setPerfil(res.data);
      } catch (error) {
        console.error("❌ Error cargando perfil:", error);
        setPerfil(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPerfil();
  }, [user, token]);

  // 🗑️ Eliminar perfil
  const handleDelete = async () => {
    if (!perfil?._id) return;
const result = await Swal.fire({
  title: t.confirmTitle,
  text: t.confirmText,
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#d33",
  cancelButtonColor: "#3085d6",
  confirmButtonText: t.confirmButton,
  cancelButtonText: t.cancelButton,
});

    if (!result.isConfirmed) return;

    try {
      const url =
        user.role === "atleta"
          ? `${API_URL}/athletes/${perfil._id}`
          : `${API_URL}/trainers/${perfil._id}`;

      await axios.delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      await Swal.fire("Eliminado", "Tu perfil ha sido eliminado correctamente.", "success");//aca falta traducir 
      setPerfil(null);
      navigate("/");
    } catch (error) {
      Swal.fire("Error", "Hubo un problema al eliminar el perfil.", "error");
      console.error(error);
    }
  };

  // ⏳ Mientras carga → Spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  // 🚪 Si no hay usuario logueado
  if (!user) {
    return (
      <div className="text-center mt-10">
        <p className="text-gray-600">Necesitás iniciar sesión para ver tu perfil.</p>
        <Link
          to="/login"
          className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Ir a Login
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md text-center">
      {/* Saludo */}
      <h1 className="text-2xl font-bold mb-4">
        {t.hello}, {user?.name || user?.email || "Usuario"}
      </h1>

      <p className="text-gray-600 mb-6">
        {user.role === "atleta" &&
          t.mensajeAtleta}
        {user.role === "entrenador" &&
          t.mensajeEntrenador}
        {user.role === "admin" &&
         t.mensajeAdministrador}
      </p>

      {/* Si el usuario ya tiene perfil */}
      {perfil ? (
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          {user.role === "atleta" && (
            <>
              <p><strong>{t.athleteName}</strong> {perfil.name}</p>
              <p><strong>{t.discipline}:</strong> {perfil.discipline}</p>
              <p><strong>{t.category}:</strong> {perfil.category}</p>
              <p><strong>{t.level}:</strong> {perfil.level}</p>
            </>
          )}

          {user.role === "entrenador" && (
            <>
              <p><strong>{t.trainerName}</strong> {perfil.name}</p>
              <p><strong>{t.trainerEspecialidad}:</strong> {perfil.especialidad}</p>
              <p><strong>{t.trainerClub}:</strong> {perfil.club}</p>
              <p><strong>{t.trainerExperiencia}:</strong> {perfil.experiencia} años</p>
            </>
          )}

          <div className="flex justify-center gap-4 mt-4">
            <Link
              to={
                user.role === "atleta"
                  ? `/athletes/${perfil._id}/edit`
                  : `/trainers/${perfil._id}/edit`
              }
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
            >
              {t.editProfile}
            </Link>

            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              {t.deleteProfile}
            </button>
          </div>
        </div>
      ) : (
        <>
          {user.role === "atleta" && (
            <Link
              to="/athletes/new"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {t.createProfileAthlete}
            </Link>
          )}
          {user.role === "entrenador" && (
            <Link
              to="/trainer/new"
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              {t.createProfileTrainer}
            </Link>
          )}
        </>
      )}
    </div>
  );
};

export default MyProfile;
