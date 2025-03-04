import { supabase } from "../../../api/supabaseClient";

export const loginUser = async (email, password) => {
	try {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) {
			if (error.message.includes("Email not confirmed")) {
				throw new Error(
					"Por favor, confirma tu correo electrónico antes de iniciar sesión."
				);
			}
			throw new Error(error.message);
		}

		const { nombre, apellido } = data.user.user_metadata || {};

		return { ...data.user, nombre, apellido };
	} catch (error) {
		console.error("Error al intentar iniciar sesión:", error.message);
		throw error;
	}
};
