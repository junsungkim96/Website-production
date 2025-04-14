const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const multer = require("multer");
const nodemailer = require("nodemailer");
const PORT = 5000;

// Load environment variable
require('dotenv').config();

// Enable CORS for requests from localhost:3000 and other ports
// app.use(cors({origin: '*'}));

// Enable CORS for requests from your frontend domain (modify with your actual domain)
const corsOptions = {
  origin: 'https://www.qblackai.com',  // Frontend domain
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Serve static files for React
app.use(express.static(path.join(__dirname, "public")));

// Resume upload (in memory)
const upload = multer({storage: multer.memoryStorage()});

// Email send
const transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
  }
})

// CONTACT
app.post('/api/contact', async(req, res) => {
  try{
    const {questionType, companyName, firstName, lastName, email, subject, message} = req.body;

    // Email to internal team
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
      replyTo: email
    });

    // Confirmation email to sender
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: `Thanks for contacting Qblack AI`,
      text: `Hi ${firstName},\n\nThank you for reaching out to us!\nWe've received your message and will get back to you shortly.\n\nBest regards,\nQblack AI Team`
    });

    res.status(200).json({message: 'Message sent successfully'});
  } catch (error) {
    console.error('Mail send error:', error);
    res.status(500).json({message: 'Failed to send message'});
  }
})

// CONTACT SALES
app.post('/api/contact-sales', async(req, res) => {
  try{
    const {productType, quantity, companyName, firstName, lastName, email, message} = req.body;

    // Email to internal team
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: process.env.MAIL_USER,
      subject: `Product Inquiry from ${companyName}`,
      text: `
        Name: ${firstName}, ${lastName}
        Email: ${email}
        Product Type: ${productType}
        Quantity: ${quantity}
        Message: ${message}
      `,
      replyTo: email
    });

    // Confirmation email to buyer
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: `Thanks for your interest in our product`,
      text: `Hi ${firstName},\n\nThank you for reaching out to us!\nWe've received your inquiry and will get back to you shortly.\n\nBest regards,\nQblack AI Team`
    });

    res.status(200).json({message: 'Message sent successfully'});
  } catch (error){
    console.error('Mail send error:', error);
    res.status(500).json({message: 'Failed to send message'});
  }
})

// APPLY
app.post('/api/apply', upload.single('resume'), async(req, res) => {
  try{
    const {firstName, lastName, email, phone} = req.body;
    const resume = req.file;
  
    // 내부 수신자에게 보내는 메일
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: process.env.MAIL_USER,
      subject: `Job Application from ${firstName} ${lastName}`,
      text: `Name: ${firstName} ${lastName} \nEmail: ${email} \nPhone: ${phone}`,
      replyTo: email,
      attachments: resume ? [{
        filename: resume.originalname,
        content: resume.buffer,
      }] : [],
    });

    // 지원자에게 지원 접수확인 메일 발송
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: `Thanks for applying to Qblack AI`,
      text: `Dear ${firstName} ${lastName},\n\nThank you for applying to Qblack AI!\nWe have received your application and will review it carefully.\n\nWe appreciate your interest in joining us.\n\nBest regards,\nQblack AI Team`
    });
    

    res.status(200).json({message: "Application submitted successfully"});
  } catch (error){
    console.error("Mail send error:", error);
    res.status(500).json({message: "Mail send failed"});
  }
})

// File download route
app.get('/api/download/trial', function(req, res) {
  const filePath = path.join(__dirname, "public", "files", "test.txt");

  // Log the file path to make sure it's correct
  console.log("Serving file from:", filePath);

  res.download(filePath, "test.txt", (err) => {
    if (err) {
      console.error("파일 다운로드 오류:", err);
      res.status(500).send("파일을 다운로드할 수 없습니다");
    }
  });
});

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
});