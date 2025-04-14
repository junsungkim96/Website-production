// pages/api/apply.js
import multer from "multer";
import nodemailer from "nodemailer";

// Resume upload (in memory)
const upload = multer({ storage: multer.memoryStorage() });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {

  // Enable CORS for your frontend domain
  res.setHeader('Access-Control-Allow-Origin', 'https://www.qblackai.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  // Multer 처리 (파일 업로드)
  upload.single("resume")(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: "File upload failed" });
    }

    const { firstName, lastName, email, phone } = req.body;
    const resume = req.file;

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
      // 내부 팀에게 메일
      await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: process.env.MAIL_USER,
        subject: `Job Application from ${firstName} ${lastName}`,
        text: `Name: ${firstName} ${lastName} \nEmail: ${email} \nPhone: ${phone}`,
        replyTo: email,
        attachments: resume
          ? [
              {
                filename: resume.originalname,
                content: resume.buffer,
              },
            ]
          : [],
      });

      // 사용자에게 확인 메일
      await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: `Thanks for applying to Qblack AI`,
        text: `Dear ${firstName} ${lastName},\n\nThank you for applying to Qblack AI!\nWe have received your application and will review it carefully.\n\nWe appreciate your interest in joining us.\n\nBest regards,\nQblack AI Team`
      });

      res.status(200).json({ message: "Application submitted successfully" });
    } catch (error) {
      console.error("메일 전송 에러:", error);
      res.status(500).json({ message: "Failed to send application" });
    }
  });
}
