import { supabase } from "../../../../api/supabaseClient";

export const getClient = async () => {
	try {
		const { data, error } = await supabase
			.from("usuario")
			.select("*")
			.eq("tipo", 2);

		if (error) {
			throw new Error(error.message);
		}

		return data;
	} catch (error) {
		console.error("Error al obtener los usuarios:", error);
		return [];
	}
};
