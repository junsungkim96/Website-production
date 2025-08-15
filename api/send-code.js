import { MongoClient } from 'mongodb';

// MongoDB 연결
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6자리 코드
}

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
    const expires = Date.now() + 5 * 60 * 1000; // 5분 유효

    // 기존 코드 삭제 후 새 코드 저장
    await codes.updateOne(
      { email },
      { $set: { code, expires } },
      { upsert: true }
    );

    // TODO: 실제 이메일 전송 로직 추가 가능
    console.log(`Verification code for ${email}: ${code}`);

    return res.status(200).json({ message: 'Verification code sent.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  } finally {
    await client.close();
  }
}
