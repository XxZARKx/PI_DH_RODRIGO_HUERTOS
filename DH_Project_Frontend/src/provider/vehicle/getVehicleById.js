import api from "../../../api/api";

export const getVehicleById = async (id) => {
	try {
		const { data, error } = await api.get(`/vehiculo/${id}`);

		if (error) {
			throw new Error(error.message);
		}

		return data;
	} catch (error) {
		console.error("Error al obtener el vehículo:", error);
		return null;
	}
};
