import nodemailer from 'nodemailer';

let verificationStore = {}; // 메모리 저장
export const config = {
  api: { bodyParser: true },
};

export default async function handler(req, res) {
  // CORS 처리
  res.setHeader('Access-Control-Allow-Origin', 'https://www.qblackai.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email is required' });

  try {
    // 6자리 랜덤 코드 생성
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // 메모리 저장 (5분 TTL)
    verificationStore[email] = { code, expires: Date.now() + 5 * 60 * 1000 };

    // Nodemailer 설정
    const transporter = nodemailer.createTransport({
      host: "mail.privateemail.com",
      port: 465,
      secure: true,
      auth: { user: process.env.MAIL_USER, pass: process.env.MAIL_PASS },
    });

    // 인증 코드 메일 발송
    await transporter.sendMail({
      from: `"QblackAI Info" <${process.env.MAIL_USER}>`,
      to: email,
      subject: `[QblackAI] Your verification code is ${code}`,
      text: `Your verification code is ${code}. This code expires in 5 minutes.`,
    });

    res.status(200).json({ message: 'Verification code sent' });
  } catch (error) {
    console.error('Send code error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// 필요 시 다른 모듈에서 verificationStore 접근 가능
export { verificationStore };
