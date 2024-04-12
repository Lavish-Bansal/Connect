const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const { getMaxListeners } = require("../models/admin");
dotenv.config();

function sendSMS(Email, otp) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.NODE_MAILER_USER,
            pass: process.env.NODE_MAILER_PASS
        }
    });

  let mailOptions = {
    from: process.env.NODE_MAILER_USER,
    to: Email,
    subject: "One Time Password - CampusConnect",
    html: `Please keep your OTP confidential and do not share it with anyone. The OTP will be valid for five minutes only. <br><strong>OTP: ${otp}</strong><br><br>`,
  };

  transporter.sendMail(mailOptions, function (err, success) {
    if (err) {
      console.log(err);
    } else {
      console.log("Email sent successfully");
    }
  });
}

module.exports = {
  sendSMS,
};
