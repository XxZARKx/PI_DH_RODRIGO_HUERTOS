import api from "../../../api/api";

export const getReservationsByUserId = async (userId) => {
  try {
    const response = await api.get(`/reservas/usuario/${userId}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return []; // Si no hay reservas, devuelve un array vacío
    }
    throw new Error(error.response?.data?.message || "Error al obtener las reservas del usuario.");
  }
};