import api from "../../../api/api";

export const getVehicles = async () => {
	try {
		const { data, error } = await api.get("/vehiculos");

		if (error) {
			throw new Error(error.message);
		}

		return data;
	} catch (error) {
		console.error("Error al obtener los vehículos:", error);
		return [];
	}
};
