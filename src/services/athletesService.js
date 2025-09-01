import axios from "axios";

// URL base de tu MockAPI (cambiala por la tuya)
const API_URL = "https://mod4-backend-final.onrender.com"; 

// Obtener todos los atletas
export const getAthletes = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/athletes`);
    return response.data;
  } catch (error) {
    console.error("Error fetching athletes:", error);
    throw error;
  }
};

// Obtener un atleta por ID
export const getAthleteById = async (id) => {
 
  try {
    const response = await axios.get(`${API_URL}/api/athletes/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching athlete with id ${id}:`, error);
    throw error;
  }
};

// Crear un nuevo atleta
export const createAthlete = async (athleteData) => {
  try {
    const response = await axios.post(`${API_URL}/api/athletes`, athleteData);
    return response.data;
  } catch (error) {
    console.error("Error creating athlete:", error);
    throw error;
  }
};

// Editar un atleta existente
export const updateAthlete = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/api/athletes/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating athlete with id ${id}:`, error);
    throw error;
  }
};

// Eliminar un atleta
export const deleteAthlete = async (id) => {
  try {
    await axios.delete(`${API_URL}/api/athletes/${id}`);
    return true;
  } catch (error) {
    console.error(`Error deleting athlete with id ${id}:`, error);
    throw error;
  }
};

// Obtener atletas por disciplina// no lo soporta comprobado 
export const getAthletesByDiscipline = async (discipline) => {
  try {
    // si MockAPI soporta query params
    const res = await axios.get(`${API_URL}?discipline=${discipline}`);
    return res.data;
  } catch (error) {
    console.error("Error al obtener atletas por disciplina", error);
    throw error;
  }
};