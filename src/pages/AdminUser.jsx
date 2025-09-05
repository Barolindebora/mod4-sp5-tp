import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const AdminUser = () => {
  const [users, setUsers] = useState([]);
  const { token } = useAuth();
  const { t } = useLanguage();
  const API_URL = "https://mod4-backend-final.onrender.com/api/users"; // ajustar según tu backend
    const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(API_URL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, [token]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Este usuario será eliminado permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_URL}/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        Swal.fire("Eliminado", "Usuario eliminado correctamente", "success");
        setUsers(users.filter((user) => user._id !== id));
      } catch (error) {
        Swal.fire("Error", "No se pudo eliminar al usuario", "error");
        console.error(error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{t.userAdmin}</h1>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">{t.athleteName}</th>
            <th className="border px-4 py-2">Mail</th>
            <th className="border px-4 py-2">{t.athleteRole}</th>
            <th className="border px-4 py-2">{t.actions}</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td className="border px-4 py-2">{u.name}</td>
              <td className="border px-4 py-2">{u.email}</td>
              <td className="border px-4 py-2">{u.role}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleDelete(u._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                >
                 {t.delete}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => navigate(-1)} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
       {t.goBack}
      </button>
    </div>
  );
};

export default AdminUser;