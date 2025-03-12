import api from "../../../api/api";	

export const createVehicle = async (vehicle) => {
	const { data, error } = await api.post("/vehiculo", vehicle);

	if (error) {
		console.error("Error al crear el vehículo:", error);
		return false;
	}
	console.log("Vehículo creado con éxito:", data);
	return true;
};
