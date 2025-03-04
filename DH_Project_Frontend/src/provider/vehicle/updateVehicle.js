import { supabase } from "../../../api/supabaseClient";

export const updateVehicle = async (vehicle) => {
	const { data, error } = await supabase
		.from("vehiculo")
		.update(vehicle)
		.eq("id", vehicle.id);

	if (error) {
		console.error("Error al actualizar el vehículo:", error);
		throw new Error(error.message); // Lanza el error para que sea capturado por el onError
	}

	console.log("Vehículo actualizado con éxito:", data);
	return true;
};
