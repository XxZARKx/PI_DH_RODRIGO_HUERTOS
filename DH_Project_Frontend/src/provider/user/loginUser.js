import api from "../../../api/api";

export const loginUser = async (email, password) => {
  try {
    const { data } = await api.post("/auth/login", {
      correo: email,
      contrasena: password,
    });

    if (!data.jwt) {
      throw new Error("Error: No se recibió un token.");
    }

    localStorage.setItem("token", data.jwt);

    return { success: true, token: data.jwt };
  } catch (error) {
    console.error("Error al intentar iniciar sesión:", error.response?.data || error.message);
    throw new Error(error.response?.data || "Error al iniciar sesión.");
  }
};
