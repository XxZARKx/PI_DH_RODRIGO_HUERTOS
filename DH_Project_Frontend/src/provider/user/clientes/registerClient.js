import { supabase } from "../../../../api/supabaseClient";

export const registerClient = async (clientData) => {
    const { nombre, apellido, dni, correo, contrasena } = clientData;

    try {
        // 🔹 Registrar usuario en Supabase Auth (sin usar el ID generado por Supabase)
        const { data, error } = await supabase.auth.signUp({
            email: correo,
            password: contrasena,
            options: {
                data: {
                    nombre,
                    apellido,
                    dni,
                    tipo: 2, // Cliente
                },
            },
        });

        if (error) {
            throw error;
        }

        // 🔹 Guardar usuario en la tabla "usuario" (dejando que el ID se genere solo)
        const { error: dbError } = await supabase.from("usuario").insert([
            {
                nombre,
                apellido,
                dni,
                correo,
                contraseña: contrasena, // 👈 Asegurar que se envía la contraseña
                tipo: 2, // 👈 Relación con "rol_usuario" (2 = Cliente)
            },
        ]);

        if (dbError) {
            throw dbError;
        }

        console.log("Usuario registrado y guardado en la base de datos.");
        return {
            success: true,
            message: "Se ha enviado un correo de confirmación a tu email.",
        };
    } catch (error) {
        console.error("Error al registrar el cliente:", error.message);
        return {
            success: false,
            message: error.message || "Error al registrar el usuario",
        };
    }
};
