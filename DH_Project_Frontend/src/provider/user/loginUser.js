import api from "../../../api/api";

export const loginUser = async ({ email, password }) => {
  try {
    const { data } = await api.post("/auth/login", {
      correo: email,
      contrasena: password,
    });

    sessionStorage.setItem("token", data.jwt);
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        id: data.id,
        nombre: data.nombre,
        apellido: data.apellido,
        rol: data.rol,
        correo: data.correo,
      })
    );

    return { success: true, token: data.jwt, user: data };
  } catch (error) {
    console.error("Error al iniciar sesión:", error.response?.data || error.message);
    throw new Error(error.response?.data || "Error desconocido al iniciar sesión.");
  }
};
