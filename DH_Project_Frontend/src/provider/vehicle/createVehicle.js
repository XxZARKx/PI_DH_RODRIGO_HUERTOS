import { supabase } from "../../../api/supabaseClient";

export const createVehicle = async (vehicle) => {
	const { data, error } = await supabase.from("vehiculo").insert([vehicle]);

	if (error) {
		console.error("Error al crear el vehículo:", error);
		return false;
	}
	console.log("Vehículo creado con éxito:", data);
	return true;
};
