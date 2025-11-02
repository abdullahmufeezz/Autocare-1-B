import { supabase } from "../config/supabaseClient.js";

export const getUsers = async (req, res) => {
  const { data, error } = await supabase.from("users").select("*");
  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

export const createUser = async (req, res) => {
  const { name, email, phone } = req.body;

  const { data, error } = await supabase
    .from("users")
    .insert([{ name, email, phone }])
    .select();

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
};

