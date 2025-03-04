import { supabase } from "../../../api/supabaseClient";

export const createReservation = async (reservationData) => {
	const { data, error } = await supabase
		.from("reserva")
		.insert([reservationData]);

	if (error) {
		throw new Error(error.message);
	}

	return data;
};
