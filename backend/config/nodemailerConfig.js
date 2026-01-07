const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,          // smtp-relay.brevo.com
  port: process.env.SMTP_PORT,          // 587
  secure: false,                        // MUST be false for 587
  auth: {
    user: process.env.SMTP_USER,        // apikey
    pass: process.env.SMTP_PASS,        // Brevo SMTP key
  },
  tls: {
    rejectUnauthorized: false,          // Fixes Render TLS issues
  },
});

// OPTIONAL but HIGHLY recommended
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP connection failed:", error);
  } else {
    console.log("✅ SMTP server is ready to send emails");
  }
});

module.exports = transporter;
