import api from "../../../api/api";

export const updateVehicleStatus = async ({ id, status }) => {
	const { data, error } = await api.put(`/vehiculo/${id}`, {
		estado: status,
	});

	if (error) {
		throw new Error(error.message);
	}

	return data;
};
