import { supabase } from "../config/supabaseClient.js";

export const getVehicles = async (req, res) => {
  const { data, error } = await supabase.from("vehicles").select("*");
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

export const createVehicle = async (req, res) => {
  const { user_id, make, model, year, license_plate } = req.body;

  const { data, error } = await supabase
    .from("vehicles")
    .insert([{ user_id, make, model, year, license_plate }])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
};
