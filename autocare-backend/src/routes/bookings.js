import express from "express";
import { getBookings, createBooking, updateBookingStatus } from "../controllers/bookingsController.js";
const router = express.Router();

router.get("/", getBookings);
router.post("/", createBooking);
router.put("/:id", updateBookingStatus);

export default router;
