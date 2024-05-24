const RoomBooking = require("../models/roomBookingModel");
const { sendConfirmationEmail } = require("../services/emailService");
const { exportToExcel } = require("../utils/exportToExcel");
const moment = require("moment");

exports.createBooking = async (req, res) => {
  const {
    nameofperson: name,
    department,
    date,
    checkin,
    checkout,
    purpose,
    message,
    room,
  } = req.body;

  const formattedDate = moment(date).format("YYYY-MM-DD");

  const newBooking = new RoomBooking({
    name,
    department,
    date: formattedDate,
    checkin,
    checkout,
    purpose,
    message,
    room,
  });

  try {
    await newBooking.save();
    await sendConfirmationEmail(
      name,
      message,
      department,
      checkin,
      checkout,
      purpose,
      room
    );
    res.status(200).send("Booking successfully created and email sent.");
  } catch (err) {
    console.error("Error inserting into database:", err);
    res.status(500).send("An error occurred while processing the booking.");
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await RoomBooking.find();
    res.json(bookings);
  } catch (error) {
    console.error("Error retrieving bookings:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateBooking = async (req, res) => {
  const bookingId = req.params.id;
  const { checkout } = req.body;

  try {
    const updatedBooking = await RoomBooking.findByIdAndUpdate(
      bookingId,
      { checkout },
      { new: true }
    );

    if (!updatedBooking) {
      return res.status(404).send("Booking not found.");
    }

    res.status(200).send("Checkout time updated successfully.");
  } catch (err) {
    console.error("Error updating checkout time in database:", err);
    res.status(500).send("An error occurred while updating checkout time.");
  }
};

exports.deleteBooking = async (req, res) => {
  const bookingId = req.params.id;

  try {
    const deletedBooking = await RoomBooking.findByIdAndDelete(bookingId);

    if (!deletedBooking) {
      return res.status(404).send("Booking not found.");
    }

    res.status(200).send("Booking deleted successfully.");
  } catch (err) {
    console.error("Error deleting booking from database:", err);
    res.status(500).send("An error occurred while deleting booking.");
  }
};

exports.exportBookingsToExcel = async (req, res) => {
  try {
    const bookings = await RoomBooking.find({});
    const buffer = await exportToExcel(bookings);

    res.set({
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": "attachment; filename=room_bookings.xlsx",
    });
    res.send(buffer);
  } catch (error) {
    console.error("Error exporting to Excel:", error);
    res.status(500).send("An error occurred while exporting to Excel.");
  }
};
