import supabase from "./supabaseClient";

export async function getBookings() {
  const { data, error } = await supabase.from("bookings").select("*");

  if (error) {
    console.error(error);
    throw new Error("Bikes could not be loaded");
  }
  return data;
}

export async function createBooking(newBooking) {
  const { error } = await supabase.from("bookings").insert(newBooking);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be created");
  }
}
