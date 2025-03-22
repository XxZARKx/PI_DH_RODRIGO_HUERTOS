import api from "../../../api/api";

export const getReservationsByVehicleId = async (vehicleId) => {
  try {
    const response = await api.get(`/reservas/vehiculo/${vehicleId}`);
    return response.data; // Retorna las reservas del vehículo
  } catch (error) {
    console.error("Error al obtener las reservas del vehículo:", error);
    throw new Error("No se pudieron cargar las reservas del vehículo.");
  }
};