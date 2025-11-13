// server.js
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send-email", async (req, res) => {
  const { name, email, company, position, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "galvatronixtechnologies@gmail.com", // your Gmail
      pass: "zngp czvr vzku geun", // ⚠️ use Gmail App Password here
    },
  });

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: "galvatronixtechnologies@gmail.com",
    subject: `New Inquiry from ${name} (${company || "Individual"})`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Company:</b> ${company || "N/A"}</p>
      <p><b>Position:</b> ${position || "N/A"}</p>
      <p><b>Message:</b></p>
      <p>${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Email Error:", error);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
