const mongoose = require("mongoose");

const roomBookingSchema = new mongoose.Schema({
  name: String,
  department: String,
  date: String,
  checkin: String,
  checkout: String,
  purpose: String,
  message: String,
  room: String,
});

const RoomBooking = mongoose.model("RoomBooking", roomBookingSchema);

module.exports = RoomBooking;
