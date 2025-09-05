import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";

const MyProfile = () => {
  const { user, token } = useAuth();
  const [perfil, setPerfil] = useState(null);
  const navigate = useNavigate();

  const API_URL = "https://mod4-backend-final.onrender.com/api";

  useEffect(() => {
    const fetchPerfil = async () => {
      if (!user) return;

      try {
        let url = "";
        if (user.role === "atleta") {
          url = `${API_URL}/athletes/me`;
        } else if (user.role === "entrenador") {
          url = `${API_URL}/trainers/me`;
        }

        if (!url) return;

        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        setPerfil(res.data);
      } catch (error) {
        console.error("Error cargando perfil:", error);
        setPerfil(null); // si no tiene perfil creado
      }
    };

    fetchPerfil();
  }, [user, token]);

  // 🗑️ Función para eliminar perfil (dinámica)
  const handleDelete = async () => {
    if (!perfil?._id) return;

    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Tu perfil será eliminado y no podrás recuperarlo.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        const url =
          user.role === "atleta"
            ? `${API_URL}/athletes/${perfil._id}`
            : `${API_URL}/trainers/${perfil._id}`;

        await axios.delete(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        await Swal.fire("Eliminado", "Tu perfil ha sido eliminado correctamente.", "success");
        setPerfil(null);
        navigate("/");
      } catch (error) {
        Swal.fire("Error", "Hubo un problema al eliminar el perfil.", "error");
        console.error(error);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md text-center">
      {/* Saludo */}
      <h1 className="text-2xl font-bold mb-4">
        Hola, {user?.name || user?.email || "Usuario"}
      </h1>

      <p className="text-gray-600 mb-6">
        {user?.role === "atleta" &&
          "Desde aquí podés crear y administrar tu perfil de atleta."}
        {user?.role === "entrenador" &&
          "Desde aquí podés crear y administrar tu perfil de entrenador."}
        {user?.role === "admin" &&
          "Sos administrador, no tenés perfil propio pero podés gestionar todo."}
      </p>

      {/* Si el usuario ya tiene perfil */}
      {perfil ? (
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          {/* Datos de Atleta */}
          {user.role === "atleta" && (
            <>
              <p><strong>Nombre:</strong> {perfil.name}</p>
              <p><strong>Disciplina:</strong> {perfil.discipline}</p>
              <p><strong>Categoría:</strong> {perfil.category}</p>
              <p><strong>Nivel:</strong> {perfil.level}</p>
            </>
          )}

          {/* Datos de Entrenador */}
          {user.role === "entrenador" && (
            <>
              <p><strong>Nombre:</strong> {perfil.name}</p>
              <p><strong>Especialidad:</strong> {perfil.especialidad}</p>
              <p><strong>Club:</strong> {perfil.club}</p>
              <p><strong>Experiencia:</strong> {perfil.experiencia} años</p>
            </>
          )}

          {/* Botones */}
          <div className="flex justify-center gap-4 mt-4">
            <Link
              to={
                user.role === "atleta"
                  ? `/athletes/${perfil._id}/edit`
                  : `/trainers/${perfil._id}/edit`
              }
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
            >
              Editar mi perfil
            </Link>

            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Eliminar perfil
            </button>
          </div>
        </div>
      ) : (
        // Si no tiene perfil creado
        <>
          {user.role === "atleta" && (
            <Link
              to="/athletes/new"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Crear mi perfil de atleta
            </Link>
          )}
          {user.role === "entrenador" && (
            <Link
              to="/trainer/new"
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Crear mi perfil de entrenador
            </Link>
          )}
        </>
      )}
    </div>
  );
};

export default MyProfile;
