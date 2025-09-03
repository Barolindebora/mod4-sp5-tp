import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const MyProfile = () => {
  const { user, token } = useAuth();
  const [perfil, setPerfil] = useState(null);

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const res = await axios.get("https://mod4-backend-final.onrender.com/api/athletes/me", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setPerfil(res.data);
      } catch (error) {
        console.error("Error cargando perfil:", error);
      }
    };

    if (user) fetchPerfil();
  }, [user, token]);

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md text-center">
      {/* Saludo */}
      <h1 className="text-2xl font-bold mb-4">
        Hola, {user?.name || user?.email || "Usuario"}
      </h1>

      <p className="text-gray-600 mb-6">
        Desde aquí podés crear y administrar tu perfil de atleta.
      </p>

      {/* Si el usuario ya tiene perfil */}
      {perfil ? (
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <p><strong>Nombre:</strong> {perfil.name}</p>
          <p><strong>Disciplina:</strong> {perfil.discipline}</p>
          <p><strong>Categoría:</strong> {perfil.category}</p>
          <p><strong>Nivel:</strong> {perfil.level}</p>
          {/* Botón para editar */}
          <Link
            to={`/athletes/${perfil._id}/edit`}
            className="mt-4 inline-block bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            Editar mi perfil
          </Link>
        </div>
      ) : (
        // Si no tiene perfil, mostrar botón de crear
        <Link
          to="/athletes/new"
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Crear mi perfil de atleta
        </Link>
      )}
    </div>
  );
};

export default MyProfile;