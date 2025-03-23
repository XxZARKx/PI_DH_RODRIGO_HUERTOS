import { supabase } from "../../../../api/supabaseClient";

export const registerClient = async (clientData) => {
    const { nombre, apellido, dni, correo, contrasena, tipo } = clientData; 

    try {
        const { data, error } = await supabase.auth.signUp({
            email: correo,
            password: contrasena,
            options: {
                data: {
                    nombre,
                    apellido,
                    dni,
                    tipo, 
                },
            },
        });

        if (error) {
            throw error;
        }

        const { error: dbError } = await supabase.from("usuario").insert([
            {
                nombre,
                apellido,
                dni,
                correo,
                contraseña: contrasena,
                tipo, 
            },
        ]);

        if (dbError) {
            throw dbError;
        }

        console.log("Usuario registrado y guardado en la base de datos.");
        return {
            success: true,
            message: "Se ha enviado un correo de confirmación a tu email. Puede que este en correo no deseado",
        };
    } catch (error) {
        console.error("Error al registrar el cliente:", error.message);
        return {
            success: false,
            message: error.message || "Error al registrar el usuario",
        };
    }
};
