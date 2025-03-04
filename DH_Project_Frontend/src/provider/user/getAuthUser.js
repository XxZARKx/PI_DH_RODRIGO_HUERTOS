// src/auth.js
import { supabase } from "../../../api/supabaseClient";

export const getAuthenticatedUser = async () => {
	try {
		const {
			data: { user },
			error,
		} = await supabase.auth.getUser();
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
