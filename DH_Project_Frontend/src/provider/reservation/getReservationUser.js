import api from "../../../api/api";

export const getReservationsByUserId = async (userId) => {
	const { data, error } = await api.get(`/reserva/usuario/${userId}`);

	if (error) {
		throw new Error(error.message);
	}

	return data;
};
