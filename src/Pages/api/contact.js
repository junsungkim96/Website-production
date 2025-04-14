import nodemailer from "nodemailer";

export default async function handler(req, res) {
  // Enable CORS for your frontend domain
  res.setHeader('Access-Control-Allow-Origin', 'https://qblackai.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { questionType, companyName, firstName, lastName, email, subject, message } = req.body;

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
      subject: `Contact from ${companyName}`,
      text: `
        Name: ${firstName}, ${lastName}
        Email: ${email}
        Question Type: ${questionType}
        Subject: ${subject}
        Message: ${message}
      `,
      replyTo: email,
    });

    // 사용자에게 확인 메일
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: `Thanks for contacting Qblack AI`,
      text: `Hi ${firstName},\n\nThank you for reaching out to us!\nWe've received your message and will get back to you shortly.\n\nBest regards,\nQblack AI Team`
    });

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error("메일 전송 에러:", error);
    res.status(500).json({ message: 'Failed to send message' });
  }
}
