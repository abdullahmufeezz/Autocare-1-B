import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import usersRoutes from "./routes/users.js";
import vehiclesRoutes from "./routes/vehicles.js";
import bookingsRoutes from "./routes/bookings.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Mount routes
app.use("/api/users", usersRoutes);
app.use("/api/vehicles", vehiclesRoutes);
app.use("/api/bookings", bookingsRoutes);

app.get("/", (req, res) => {
  res.send("✅ AutoCare backend is running successfully!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚗 AutoCare backend running on port ${PORT}`));
