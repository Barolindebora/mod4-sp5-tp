import axios from "axios";

const API_URL = "https://mod4-backend-final.onrender.com";

// 👉 función helper para obtener headers con token
const authHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};
export const getAthletes = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/athletes`);
    return response.data;
  } catch (error) {
    console.error("Error fetching athletes:", error.response?.data || error.message);
    throw error;
  }
};

// Obtener un atleta por ID (público, sin token)
export const getAthleteById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/api/athletes/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching athlete with id ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

// Crear un nuevo atleta (protegida)
export const createAthlete = async (athleteData) => {
  try {
    const response = await axios.post(`${API_URL}/api/athletes`, athleteData, {
      headers: authHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error creating athlete:", error.response?.data || error.message);
    throw error;
  }
};

// Editar un atleta existente (protegida)
export const updateAthlete = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/api/athletes/${id}`, updatedData, {
      headers: authHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating athlete with id ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

// Eliminar un atleta (protegida)
export const deleteAthlete = async (id) => {
  try {
    await axios.delete(`${API_URL}/api/athletes/${id}`, {
      headers: authHeaders(),
    });
    return true;
  } catch (error) {
    console.error(`Error deleting athlete with id ${id}:`, error.response?.data || error.message);
    throw error;
  }
};

// Obtener atletas por disciplina (⚠️ esta NO necesita token)
export const getAthletesByDiscipline = async (discipline) => {
  try {
    const res = await axios.get(`${API_URL}/api/athletes/disciplina/${discipline}`);
    return res.data;
  } catch (error) {
    console.error("Error al obtener atletas por disciplina", error.response?.data || error.message);
    throw error;
  }
};

// Ir a mi perfil (protegida)
export const getMyProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/athletes/me`, {
      headers: authHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching my profile:", error.response?.data || error.message);
    throw error;
  }
};