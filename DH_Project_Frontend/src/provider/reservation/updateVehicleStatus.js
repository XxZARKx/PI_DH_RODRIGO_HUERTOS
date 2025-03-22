import api from "../../../api/api";

export const updateVehicleStatus = async ({ id, status }) => {
    try {
        const response = await api.patch(`/vehiculos/${id}/estado`, { estado: status });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Error al actualizar el estado del vehículo");
    }
};