import api from "../../../api/api";
import Swal from "sweetalert2";

export const getAuthenticatedUser = async (navigate) => {
  try {
    const token = sessionStorage.getItem("token");
    if (!token || !token.includes(".")) {
      throw new Error("No has iniciado sesión.");
    }

    const response = await api.get("/auth/user", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (error) {
    handleAuthError(error, navigate);
  }
};

const handleAuthError = (error, navigate) => {
  console.error("Error de autenticación:", error.response?.data || error.message);

  if (error.message === "No has iniciado sesión.") {
    navigate("/login");
    throw error;
  }

  if (error.response && error.response.status === 401) {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    let errorMessage = "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.";
    if (error.response.data) {
      errorMessage = error.response.data;
    }

    Swal.fire({
      icon: "warning",
      title: "Sesión expirada",
      text: errorMessage,
      showCancelButton: true,
      confirmButtonText: "Ir al login",
      cancelButtonText: "Cerrar",
      timer: 10000,
      timerProgressBar: true,
    }).then((result) => {
      if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
        navigate("/login");
      }
    });

    throw new Error(errorMessage);
  }

  throw new Error(error.response?.data?.message || error.message || "Error desconocido.");
};