import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, // Gmail SMTP uses port 465 for secure connections
  secure: true, // true for 465, false for 587
  auth: {
    user: "oveshaktoton9999@gmail.com", // Your email
    pass: "fbaijopiwwidluht", // App-specific password
  },
});

const sendEmail = async ({ sendTo, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: '"Ovesh" <oveshaktoton9999@gmail.com>', // Sender's name and email
      to: sendTo, // Receiver's email
      subject: subject, // Email subject
      html: html, // Email body in HTML format
    });

    console.log("Message sent: %s", info.messageId); // Logs message ID
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; // Re-throw the error for handling in the caller
  }
};

export default sendEmail;
