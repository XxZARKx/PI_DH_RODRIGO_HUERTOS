// src/auth.js
import api from "../../../api/api";

export const getAuthenticatedUser = async () => {
	try {
		const {
			data: { user },
			error,
		} = await api.get("/auth/user");
		if (error) {
			throw error;
		}
		console.log("from getAuth: " + user);
		return user;
	} catch (error) {
		console.error("Error al obtener el usuario:", error);
		throw new Error("No se pudo obtener el usuario autenticado.");
	}
};
