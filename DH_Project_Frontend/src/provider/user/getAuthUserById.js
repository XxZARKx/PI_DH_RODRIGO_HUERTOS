import api from "../../../api/api";

export const getAuthUserById = async (userId) => {
	try {
		if (!userId) {
			throw new Error("El ID de usuario es requerido.");
		}

		// Llamar a la función de Supabase para obtener el usuario por ID
		const { data, error } = await api.get(`/auth/user/${userId}`);

		if (error) {
			throw new Error(`Error al obtener el usuario: ${error.message}`);
		}

		return data; // Retorna los datos del usuario
	} catch (error) {
		console.error(error.message);
		throw error; // Re-lanza el error para manejarlo donde sea necesario
	}
};
