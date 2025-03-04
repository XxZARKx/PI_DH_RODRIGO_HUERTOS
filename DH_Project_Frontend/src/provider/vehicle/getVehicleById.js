import { supabase } from "../../../api/supabaseClient";

export const getVehicleById = async (id) => {
	try {
		const { data, error } = await supabase
			.from("vehiculo")
			.select("*")
			.eq("id", id)
			.single();

		if (error) {
			throw new Error(error.message);
		}

		return data;
	} catch (error) {
		console.error("Error al obtener el vehículo:", error);
		return null;
	}
};
