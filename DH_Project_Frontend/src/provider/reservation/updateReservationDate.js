import { supabase } from "../../../api/supabaseClient";

export const updateReservationDate = async ({ reservationId, newDate }) => {
	const { data, error } = await supabase
		.from("reserva")
		.update({ fecha_reserva: newDate })
		.eq("id", reservationId);

	if (error) {
		throw new Error(error.message);
	}

	return data;
};
