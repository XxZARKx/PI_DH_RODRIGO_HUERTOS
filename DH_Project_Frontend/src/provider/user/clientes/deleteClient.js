import { supabase } from "../../../../api/supabaseClient";

export const deleteClient = async (id) => {
	try {
		const { data, error } = await supabase
			.from("usuario")
			.delete()
			.eq("id", id);

		if (error) {
			console.error("Error al eliminar el usuario:", error);
			return false;
		}

		console.log("Usuario eliminado con éxito:", data);
		return true;
	} catch (error) {
		console.error("Error inesperado al eliminar el usuario:", error);
		return false;
	}
};
