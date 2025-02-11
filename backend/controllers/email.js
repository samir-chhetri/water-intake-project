// import express from "express";
// import nodemailer from "nodemailer";
// import expressAsyncHandler from "express-async-handler";
// import "dotenv/config";

// const router = express.Router();

// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: parseInt(process.env.SMTP_PORT, 10),
//   secure: true, // true for port 465, false for other ports
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASS,
//   },
// });

// // Send Mail Handler
// const sendMail = expressAsyncHandler(async (req, res) => {
//   const { subject, text } = req.body; // Ensure these fields are correctly used
//   console.log(subject, text);

//   const mailOptions = {
//     from: process.env.SMTP_USER,
//     to: "asmindhakal725@gmail.com", // Replace with your recipient email
//     subject: subject,
//     text: text,
//   };

//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log("Email sent successfully:", info.response);
//     res
//       .status(200)
//       .json({ message: "Email sent successfully", messageId: info.messageId });
//   } catch (error) {
//     console.error("Error sending email:", error);
//     res
//       .status(500)
//       .json({ message: "Failed to send email", error: error.message });
//   }
// });

// router.post("/sendMail", sendMail);

// export default router;
