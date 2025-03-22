import api from "../../../api/api";

export const getAuthenticatedUser = async () => {
  try {
    const response = await api.get("/auth/user");
    return response.data; // Devuelve directamente los datos del usuario
  } catch (error) {
    console.error(
      "Error al obtener el usuario:",
      error.response?.data || error.message
    );
    throw new Error(error.response?.data?.message || "Error desconocido al obtener el usuario.");
  }
};