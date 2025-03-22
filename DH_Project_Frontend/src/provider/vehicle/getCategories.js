import api from "../../../api/api";

export const getCategories = async () => {
    try {
        const response = await api.get("/categorias");

        const data = Array.isArray(response.data) ? response.data : response.data.data || [];

        return data;
    } catch (error) {
        console.error("Error al obtener las categorías:", error);
        return []; 
    }
};