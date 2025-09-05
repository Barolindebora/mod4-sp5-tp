import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext"; // para usar el token del usuario logueado

const API_URL = "https://mod4-backend-final.onrender.com/api/trainers";

const TrainerContext = createContext();

export const TrainerProvider = ({ children }) => {
  const [trainers, setTrainers] = useState([]); // lista de entrenadores
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  // 👉 función para headers con token
  const authHeaders = () => ({
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  });

  // 👉 Obtener todos los entrenadores
  const fetchTrainers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setTrainers(res.data);
    } catch (error) {
      console.error("Error al obtener entrenadores:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  // 👉 Buscar por especialidad (query: ?especialidad=xxx)
  const searchBySpecialty = async (especialidad) => {
    try {
      const res = await axios.get(`${API_URL}/buscar/especialidad`, {
        params: { especialidad },
      });
      return res.data; // lo devolvemos sin pisar el state
    } catch (error) {
      console.error("Error al buscar entrenador:", error.response?.data || error.message);
    }
  };

  // 👉 Crear entrenador (requiere token)
  const createTrainer = async (trainerData) => {
    try {
      const res = await axios.post(API_URL, trainerData, {
        headers: authHeaders(),
      });
      setTrainers((prev) => [...prev, res.data]);
      return res.data;
    } catch (error) {
      console.error("Error al crear entrenador:", error.response?.data || error.message);
      throw error;
    }
  };

  // 👉 Actualizar entrenador (requiere token)
  const updateTrainer = async (id, trainerData) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, trainerData, {
        headers: authHeaders(),
      });
      setTrainers((prev) =>
        prev.map((t) => (t._id === id ? res.data : t))
      );
      return res.data;
    } catch (error) {
      console.error("Error al actualizar entrenador:", error.response?.data || error.message);
      throw error;
    }
  };

  // 👉 Eliminar entrenador (requiere token)
  const deleteTrainer = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: authHeaders(),
      });
      setTrainers((prev) => prev.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Error al eliminar entrenador:", error.response?.data || error.message);
      throw error;
    }
  };

  // ⚡ cargar entrenadores al montar
  useEffect(() => {
    fetchTrainers();
  }, []);

  return (
    <TrainerContext.Provider
      value={{
        trainers,
        loading,
        fetchTrainers,
        searchBySpecialty,
        createTrainer,
        updateTrainer,
        deleteTrainer,
      }}
    >
      {children}
    </TrainerContext.Provider>
  );
};

// Hook para consumir en componentes
export const useTrainers = () => useContext(TrainerContext);