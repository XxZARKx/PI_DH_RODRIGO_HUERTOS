import api from "../../../api/api";

export const updateVehicle = async (vehicle) => {
	const { data, error } = await api.put(`/vehiculo/${vehicle.id}`, vehicle);

	if (error) {
		console.error("Error al actualizar el vehículo:", error);
		throw new Error(error.message); // Lanza el error para que sea capturado por el onError
	}

	console.log("Vehículo actualizado con éxito:", data);
	return true;
};
