/*
  # Vehicle Service Management System Database Schema

  ## Overview
  This migration creates a simple transaction processing system for a vehicle service management application.
  Users can register their vehicles and book services without authentication.

  ## Tables Created

  ### 1. users
  Stores basic customer information
  - `id` (uuid, primary key) - Unique identifier for each user
  - `name` (text) - Customer's full name
  - `email` (text) - Customer's email address
  - `phone` (text) - Customer's contact phone number
  - `created_at` (timestamptz) - Timestamp when user was created

  ### 2. vehicles
  Stores vehicle information linked to users
  - `id` (uuid, primary key) - Unique identifier for each vehicle
  - `user_id` (uuid, foreign key) - References the owner user
  - `make` (text) - Vehicle manufacturer (e.g., Toyota, Honda)
  - `model` (text) - Vehicle model name
  - `year` (integer) - Manufacturing year
  - `license_plate` (text, unique) - Vehicle license plate number
  - `created_at` (timestamptz) - Timestamp when vehicle was added

  ### 3. bookings
  Stores service booking requests and their status
  - `id` (uuid, primary key) - Unique identifier for each booking
  - `vehicle_id` (uuid, foreign key) - References the vehicle being serviced
  - `user_id` (uuid, foreign key) - References the user who made the booking
  - `service_type` (text) - Type of service requested (e.g., Oil Change, Brake Service)
  - `description` (text) - Additional details about the service needed
  - `booking_date` (date) - Preferred date for service
  - `status` (text) - Current status: 'pending', 'approved', 'rejected', 'completed'
  - `admin_notes` (text) - Notes from admin (optional)
  - `created_at` (timestamptz) - Timestamp when booking was created
  - `updated_at` (timestamptz) - Timestamp when booking was last updated

  ## Security
  - RLS (Row Level Security) is enabled on all tables
  - Public access policies allow anyone to read and insert data (no authentication required)
  - This is intentional as per project requirements - no authentication needed

  ## Important Notes
  1. No authentication system is implemented as requested
  2. All users can view all data (simplified for educational DBMS project)
  3. Status updates to bookings are restricted to maintain data integrity
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create vehicles table
CREATE TABLE IF NOT EXISTS vehicles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  make text NOT NULL,
  model text NOT NULL,
  year integer NOT NULL,
  license_plate text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id uuid NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  service_type text NOT NULL,
  description text DEFAULT '',
  booking_date date NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'completed')),
  admin_notes text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_vehicles_user_id ON vehicles(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_vehicle_id ON bookings(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Anyone can view users"
  ON users FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can insert users"
  ON users FOR INSERT
  TO public
  WITH CHECK (true);

-- RLS Policies for vehicles table
CREATE POLICY "Anyone can view vehicles"
  ON vehicles FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can insert vehicles"
  ON vehicles FOR INSERT
  TO public
  WITH CHECK (true);

-- RLS Policies for bookings table
CREATE POLICY "Anyone can view bookings"
  ON bookings FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can insert bookings"
  ON bookings FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can update bookings"
  ON bookings FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for bookings table
DROP TRIGGER IF EXISTS update_bookings_updated_at ON bookings;
CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();