import { supabase } from "../../../api/supabaseClient";

export const deleteReservation = async (reservationId) => {
	try {
		// Eliminar la reserva de la base de datos
		const { data, error } = await supabase
			.from("reserva")
			.delete()
			.eq("id", reservationId);

		if (error) {
			throw new Error(error.message);
		}

		return data;
	} catch (error) {
		console.error("Error al eliminar la reserva:", error);
		throw error;
	}
};
