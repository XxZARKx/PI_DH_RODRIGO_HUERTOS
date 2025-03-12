import api from "../../../../api/api";

export const getClient = async () => {
	try {
		const { data, error } = await api.get("/usuario?tipo=2");

		if (error) {
			throw new Error(error.message);
		}

		return data;
	} catch (error) {
		console.error("Error al obtener los usuarios:", error);
		return [];
	}
};
