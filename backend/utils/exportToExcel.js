const exceljs = require("exceljs");
const moment = require("moment");

exports.exportToExcel = async function (bookings) {
  const workbook = new exceljs.Workbook();
  const worksheet = workbook.addWorksheet("Room Bookings");

  worksheet.columns = [
    { header: "ID", key: "id", width: 10 },
    { header: "Name", key: "name", width: 20 },
    { header: "Department", key: "department", width: 20 },
    { header: "Date", key: "date", width: 15 },
    { header: "Check-in Time", key: "checkin", width: 15 },
    { header: "Check-out Time", key: "checkout", width: 15 },
    { header: "Purpose", key: "purpose", width: 30 },
    { header: "Message", key: "message", width: 30 },
    { header: "Room", key: "room", width: 15 },
  ];

  bookings.forEach((booking) => {
    worksheet.addRow({
      id: booking._id,
      name: booking.name,
      department: booking.department,
      date: moment(booking.date).format("YYYY-MM-DD"),
      checkin: booking.checkin,
      checkout: booking.checkout,
      purpose: booking.purpose,
      message: booking.message,
      room: booking.room,
    });
  });

  return await workbook.xlsx.writeBuffer();
};
