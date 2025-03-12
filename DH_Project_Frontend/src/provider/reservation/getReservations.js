import api from "../../../api/api";

export const getReservations = async () => {
	try {
		const { data, error } = await api.get("/reserva");
		if (error) {
			throw new Error(error.message); // Si hay error en la consulta, lanzamos el error
		}
		return data;
	} catch (err) {
		// Usamos un nombre distinto para evitar la sobrescritura
		throw new Error(err.message);
	}
};
