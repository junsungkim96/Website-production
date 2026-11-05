
import nodemailer from "nodemailer";
import path from "path";

const PROFILE_FILE = path.join(
  process.cwd(),
  "private",
  "QblackAI_Company_Overview_2026.pdf"
);

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Origin", "https://www.qblackai.com");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  const {
    companyName,
    jobTitle,
    firstName,
    lastName,
    email,
    industry,
    acceptedTerms,
  } = req.body || {};

  if (
    !companyName?.trim() ||
    !jobTitle?.trim() ||
    !firstName?.trim() ||
    !lastName?.trim() ||
    !email?.trim() ||
    !industry ||
    acceptedTerms !== true
  ) {
    return res.status(400).json({
      success: false,
      message: "Please complete all required fields.",
    });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({
      success: false,
      message: "Invalid email address.",
    });
  }

  const transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  try {
    // Internal team notification
    await transporter.sendMail({
      from: `"QblackAI Info" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER,
      subject: `[Company Profile Request] ${companyName}`,
      text: 
    `
Company Name: ${companyName}
Job Title: ${jobTitle}
Name: ${firstName} ${lastName}
Email: ${email}
Industry: ${industry}
      `,
      replyTo: email,
    });

    // Send company profile to the requester
    await transporter.sendMail({
      from: `"QblackAI Info" <${process.env.MAIL_USER}>`,
      to: email.trim(),
      subject: "QblackAI Company Profile",
      text: `Hi ${firstName},

Thank you for your interest in QblackAI.

Please find our company profile attached.
If you have any questions or would like to learn more about our technology, feel free to contact us.

Best regards,
QblackAI Team`,
      attachments: [
        {
          filename: "QblackAI_Company_Overview_2026.pdf",
          path: PROFILE_FILE,
          contentType: "application/pdf",
        },
      ],
    });

    return res.status(200).json({
      success: true,
      message: "Company profile sent successfully.",
    });

  } catch (error) {
    console.error("Company Profile Email Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to send company profile.",
    });
  }
}
