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
    to: "rituf2fintech@gmail.com",
    subject: "Thanks For Informing, HR TEAM",
    text:
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
