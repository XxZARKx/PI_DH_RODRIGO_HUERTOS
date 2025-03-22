import api from "../../../api/api";

export const getCategories = async () => {
    try {
        const response = await api.get("/categorias");
        console.log("Respuesta del backend:", response); // Depuración

        const data = Array.isArray(response.data) ? response.data : response.data.data || [];
        console.log("Categorías extraídas:", data); // Depuración

        return data;
    } catch (error) {
        console.error("Error al obtener las categorías:", error);
        return []; // Devuelve un array vacío en caso de error
    }
};