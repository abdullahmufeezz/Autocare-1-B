import { supabase } from "../config/supabaseClient.js";

export const getBookings = async (req, res) => {
  const { data, error } = await supabase.from("bookings").select("*");
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

export const createBooking = async (req, res) => {
  const { vehicle_id, user_id, service_type, description, booking_date } = req.body;

  const { data, error } = await supabase
    .from("bookings")
    .insert([{ vehicle_id, user_id, service_type, description, booking_date }])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
};

export const updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status, admin_notes } = req.body;

  const { data, error } = await supabase
    .from("bookings")
    .update({ status, admin_notes })
    .eq("id", id)
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};
