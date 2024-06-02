const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const { getMaxListeners } = require("../models/admin");
dotenv.config();

function sendSMS(Email, otp) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.NODE_MAILER_USER,
      pass: process.env.NODE_MAILER_PASS,
    },
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

function sendTicket(Details) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODE_MAILER_USER,
      pass: process.env.NODE_MAILER_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

<<<<<<< HEAD
  let mailOptions;

  if (Details.price == 0) {
    mailOptions = {
      from: process.env.NODE_MAILER_USER,
      to: Details.email,
      subject: `Your Online Event Pass for ${Details.event_name} - CampusConnect✨`,
      html: `Dear <i>${Details.name}</i>,<br><br>Thank you for registering for ${Details.event_name}! We are excited to have you join us and want to make sure that you have all the information you need to have a great time.<br><br>Your online pass has been generated and is ready for you to use. Please remember to keep this pass with you at all times during the event and do not share it with anyone else.<br><br><strong>Pass Number: ${Details.pass}</strong><br><br>If you have any questions or concerns, please don't hesitate to reach out to us.<br><br>Best regards,<br>The CampusConnect Team`,
    };
  } else {
    mailOptions = {
      from: process.env.NODE_MAILER_USER,
      to: Details.email,
      subject: `Your Online Event Pass for ${Details.event_name} - CampusConnect✨`,
      html: `Dear <i>${Details.name}</i>,<br><br>Thank you for registering for ${Details.event_name}! We are excited to have you join us and want to make sure that you have all the information you need to have a great time.<br><br>Your online pass has been generated and is ready for you to use. Please remember to keep this pass with you at all times during the event and do not share it with anyone else.<br><br><strong>Pass Number: ${Details.pass}</strong><br><br>Here are the details of your registration:<br>Name: ${Details.name}<br>Amount Paid: ${Details.price}<br>Address: ${Details.address1} <br> City: ${Details.city} <br> PinCode: ${Details.zip}<br><br>If you have any questions or concerns, please don't hesitate to reach out to us.<br><br>Best regards,<br>The CampusConnect Team`,
    };
  }
=======
  let mailOptions = {
    from: process.env.NODE_MAILER_USER,
    to: Details.email,
    subject: `Your Online Event Pass for ${Details.event_name} - CampusConnect✨`,
    html: `Dear <i>${Details.name}</i>,<br><br>Thank you for registering for ${Details.event_name}! We are excited to have you join us and want to make sure that you have all the information you need to have a great time.<br><br>Your online pass has been generated and is ready for you to use. Please remember to keep this pass with you at all times during the event and do not share it with anyone else.<br><br><strong>Pass Number: ${Details.pass}</strong><br><br>Here are the details of your registration:<br>Name: ${Details.name}<br>Amount Paid: ${Details.price}<br>Address: ${Details.address1} <br> City: ${Details.city} <br> PinCode: ${Details.zip}<br><br>If you have any questions or concerns, please don't hesitate to reach out to us.<br><br>Best regards,<br>The CampusConnect Team`,
  };
>>>>>>> a5fe77730748e1a2c94558ebf898354f8a352191

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
  sendTicket,
};
