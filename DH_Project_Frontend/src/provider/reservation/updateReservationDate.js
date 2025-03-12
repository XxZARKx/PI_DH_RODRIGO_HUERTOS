import api from "../../../api/api";

export const updateReservationDate = async ({ reservationId, newDate }) => {
	const { data, error } = await api.put(`/reserva/${reservationId}`, {
		fecha_reserva: newDate,
	});

	if (error) {
		throw new Error(error.message);
	}

	return data;
};
