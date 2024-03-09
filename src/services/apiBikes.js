import supabase from "./supabaseClient";

export async function getBikes() {
  const { data, error } = await supabase.from("bikes").select("*");

  if (error) {
    console.error(error);
    throw new Error("Bikes could not be loaded");
  }

  return data;
}


