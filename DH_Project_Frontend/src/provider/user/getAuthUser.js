import api from "../../../api/api";

export const getAuthenticatedUser = async (navigate) => {
  try {
    // Obtener el token del sessionStorage
    const token = sessionStorage.getItem("token");
    if (!token) {
      throw new Error("No has iniciado sesión."); // Lanzar un error específico
    }

    // Hacer la solicitud al backend con el token
    const response = await api.get("/auth/user", {
      headers: { Authorization: `Bearer ${token}` }, // Incluir el token en el encabezado
    });

    return response.data; // Devolver los datos del usuario
  } catch (error) {
    console.error("Error al obtener el usuario:", error.response?.data || error.message);

    // Manejar errores específicos
    if (error.message === "No has iniciado sesión.") {
      navigate("/login"); // Redirigir al usuario al login
      throw error; // Propagar el error para que el frontend lo maneje
    }

    if (error.response && error.response.status === 401) {
      navigate("/login"); // Redirigir al usuario al login
      throw new Error(error.response.data || "No has iniciado sesión o tu sesión ha expirado.");
    }

    throw new Error(error.response?.data?.message || "Error desconocido al obtener el usuario.");
  }
};