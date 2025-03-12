import api from "../../../api/api";

export const uploadImage = async (file) => {
	const fileName = `${Date.now()}-${file.name}`;
	const { data, error } = await api.post("/upload", {
		fileName,
		file,
	});

	if (error) {
		console.error("Error al subir la imagen:", error);
		return null;
	}

	// Obtener la URL pública de la imagen subida
	const { data: publicUrlData } = api.get("/upload", {
		fileName,
	});

	return publicUrlData.publicUrl; // URL de la imagen subida
};
