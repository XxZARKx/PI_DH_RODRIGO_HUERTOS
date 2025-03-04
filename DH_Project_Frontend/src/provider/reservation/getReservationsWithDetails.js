import { supabase } from "../../../api/supabaseClient";

export const getReservationsWithDetails = async () => {
	try {
		const users = await Promise.all(
			ids.map(async (id) => {
				const {
					data: { user },
					error,
				} = await supabase.auth.admin.getUserById(id);
				if (error) {
					throw error;
				}
				return user;
			})
		);
		console.log("Usuarios obtenidos:", users);
		return users;
	} catch (error) {
		console.error("Error al obtener los usuarios:", error);
		throw new Error("No se pudo obtener los usuarios autenticados.");
	}
};
