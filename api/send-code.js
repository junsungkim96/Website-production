import { MongoClient } from 'mongodb';
import nodemailer from 'nodemailer';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6자리 코드
}

// 이메일 발송용 transporter 설정 (예: Gmail)
const transporter = nodemailer.createTransport({
  host: "mail.privateemail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER, // 발신 이메일
    pass: process.env.MAIL_PASS, // 이메일 비밀번호 또는 앱 비밀번호
  },
});

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://www.qblackai.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email required' });

  try {
    await client.connect();
    const db = client.db('licenseDB');
    const codes = db.collection('verificationCodes');

    const code = generateCode();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5분 뒤 만료

    // 기존 코드 삭제 후 새 코드 저장
    await codes.updateOne(
      { email },
      { $set: { code, expiresAt } },
      { upsert: true }
    );

    // 이메일 발송
    await transporter.sendMail({
      from: `"QblackAI" <${process.env.MAIL_USER}>`,
      to: email,
      subject: 'Your Verification Code',
      text: `Your verification code is: ${code}. It will expire in 5 minutes.`,
      html: `<p>Your verification code is: <b>${code}</b>. It will expire in 5 minutes.</p>`,
    });

    console.log(`Verification code for ${email}: ${code} (sent via email)`);

    return res.status(200).json({ message: 'Verification code sent.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  } finally {
    await client.close();
  }
}
