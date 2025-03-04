import { supabase } from "../../../api/supabaseClient";

export const getVehicles = async () => {
	try {
		const { data, error } = await supabase.from("vehiculo").select("*");

		if (error) {
			throw new Error(error.message);
		}

		return data;
	} catch (error) {
		console.error("Error al obtener los vehículos:", error);
		return [];
	}
};
