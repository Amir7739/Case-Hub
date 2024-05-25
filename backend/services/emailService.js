const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
   user: "rituanuragi1@gmail.com",
   pass: "geon ylan rgeq mfld",
  },
});

exports.sendConfirmationEmail = function (
  name,
  message,
  department,
  checkin,
  checkout,
  purpose,
  room
) {
  const mailOptions = {
    from: "rituanuragi1@gmail.com",
    to: "hr@f2fintech.com",
    subject: "Request For Conference Room Booking",
    text:
      "Dear HR Team,\n\n" +
      "I am writing to request the booking of the conference room. Please find the details below:\n\n" +
      `Name: ${name}\n` +
      `Message: ${message}\n` +
      `Department: ${department}\n` +
      `Check-in Time: ${checkin}\n` +
      `Check-out Time: ${checkout}\n` +
      `Purpose: ${purpose}\n` +
      `Room: ${room}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};
