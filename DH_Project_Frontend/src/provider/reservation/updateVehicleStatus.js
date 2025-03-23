import api from "../../../api/api";

export const updateVehicleStatus = async ({ id, status }) => {
    try {
        if (!id) {
            throw new Error("ID del vehículo no proporcionado.");
        }

        const response = await api.patch(`/vehiculos/${id}/estado`, { estado: status });
        return response.data;
    } catch (error) {
        console.error("Error al actualizar el estado del vehículo:", error);
        throw new Error(error.response?.data?.message || "Error al actualizar el estado del vehículo");
    }
};