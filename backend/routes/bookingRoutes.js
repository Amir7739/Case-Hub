const express = require("express");
const router = express.Router();

const bookingController = require("../controller/bookingController");

router.post("/home", bookingController.createBooking);
router.get("/bookings", bookingController.getAllBookings);
router.put("/bookings/:id", bookingController.updateBooking);
router.delete("/bookings/:id", bookingController.deleteBooking);
router.get("/export-to-excel", bookingController.exportBookingsToExcel);

module.exports = router;
