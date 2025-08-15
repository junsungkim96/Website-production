import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://www.qblackai.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

  const { email, code } = req.body;
  if (!email || !code) return res.status(400).json({ message: 'Email and code required' });

  try {
    await client.connect();
    const db = client.db('licenseDB');
    const codes = db.collection('verificationCodes');

    const record = await codes.findOne({ email });
    if (!record) return res.status(404).json({ message: 'No verification code found' });
    if (Date.now() > record.expires) {
      await codes.deleteOne({ email });
      return res.status(410).json({ message: 'Verification code expired' });
    }
    if (record.code !== code) return res.status(401).json({ message: 'Invalid verification code' });

    // 검증 완료 후 삭제
    await codes.deleteOne({ email });

    return res.status(200).json({ message: 'Email verified' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  } finally {
    await client.close();
  }
}