import { supabase } from "../../../api/supabaseClient";

export const getUserByEmail = async (email) => {
  try {
    if (!email || email === "undefined") {
      throw new Error("El correo electrónico es inválido.");
    }

    const { data, error } = await supabase
      .from("usuario")
      .select("*")
      .eq("correo", email)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};
