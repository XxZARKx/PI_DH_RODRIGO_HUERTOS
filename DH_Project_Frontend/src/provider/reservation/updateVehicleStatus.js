import { supabase } from "../../../api/supabaseClient";

export const updateVehicleStatus = async ({ id, status }) => {
	const { data, error } = await supabase
		.from("vehiculo")
		.update({ estado: status })
		.eq("id", id);

	if (error) {
		throw new Error(error.message);
	}

	return data;
};
