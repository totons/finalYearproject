// import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// import path from "path";
// import { fileURLToPath } from "url";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// dotenv.config({ path: path.join(__dirname, '..', '.env') });

// const smtpUser = process.env.SMTP_USER?.trim();
// const smtpPass = process.env.SMTP_PASS?.trim();
// const emailEnabled = process.env.EMAIL_ENABLED === "true" && Boolean(smtpUser && smtpPass);

// const transporter = emailEnabled ? nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true,
//     auth: {
//         user: smtpUser,
//         pass: smtpPass,
//     },
// }) : null;

// const sendEmail = async({ sendTo, subject, html }) => {
//     try {
//         if (!emailEnabled || !transporter) {
//             return null;
//         }

//         const info = await transporter.sendMail({
//             from: smtpUser, // Sender's email
//             to: sendTo, // Receiver's email
//             subject: subject, // Email subject
//             html: html, // Email body in HTML format
//         });

//         console.log("Message sent: %s", info.messageId); // Logs message ID
//         return info;
//     } catch (error) {
//         console.error("Error sending email:", error.message);
//         if (error?.code === "EAUTH" || error?.responseCode === 535) {
//             console.error("Gmail rejected the login. Use a valid Google App Password for SMTP_PASS.");
//             return null;
//         }
//         throw error;
//     }
// };

// export default sendEmail;



// import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465, // Gmail SMTP uses port 465 for secure connections
//     secure: true, // true for 465, false for 587
//     auth: {
//         // user: "oveshaktoton9999@gmail.com", // Your email
//         // pass: "qgzsrhraeencqpny", // App-specific password
//         user: "thomasoscarkeith@gmail.com", // Your email
//         pass: "pkecziqyksctldnc", // App-specific password
//     },
// });

// const sendEmail = async({ sendTo, subject, html }) => {
//     try {
//         const info = await transporter.sendMail({
//             from: '"Oveshek" <oveshaktoton9999@gmail.com>', // Sender's name and email
//             to: sendTo, // Receiver's email
//             subject: subject, // Email subject
//             html: html, // Email body in HTML format
//         });

//         console.log("Message sent: %s", info.messageId); // Logs message ID
//         return info;
//     } catch (error) {
//         console.error("Error sending email:", error);
//         throw error; // Re-throw the error for handling in the caller
//     }
// };

// export default sendEmail;




import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async ({ sendTo, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Online Learning Academy" <${process.env.EMAIL_USER}>`,
      to: sendTo,
      subject,
      html,
    });

    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export default sendEmail;