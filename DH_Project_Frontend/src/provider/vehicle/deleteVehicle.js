import { supabase } from "../../../api/supabaseClient";

export const deleteVehicle = async (id) => {
	try {
		const { data, error } = await supabase
			.from("vehiculo")
			.delete()
			.eq("id", id);

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
