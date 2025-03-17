import { supabase } from "../../../api/supabaseClient";

export const uploadImage = async (file) => {
	const fileName = `${Date.now()}-${file.name}`;
	const { data, error } = await supabase.storage
		.from("vehicle-images")
		.upload(fileName, file);

	if (error) {
		console.error("Error al subir la imagen:", error);
		return null;
	}

	// Obtener la URL pública de la imagen subida
	const { data: publicUrlData } = supabase.storage
		.from("vehicle-images")
		.getPublicUrl(fileName);

	return publicUrlData.publicUrl; // URL de la imagen subida
};
