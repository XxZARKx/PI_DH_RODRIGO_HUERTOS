import api from "../../../api/api";

export const deleteVehicle = async (id) => {
	try {
		const { data, error } = await api.delete(`/vehiculo/${id}`);

		if (error) {
			console.error("Error al eliminar el vehículo:", error);
			return false;
		}

		console.log("Vehículo eliminado con éxito:", data);
		return true;
	} catch (error) {
		console.error("Error inesperado al eliminar el vehículo:", error);
		return false;
	}
};
