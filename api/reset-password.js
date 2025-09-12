import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://www.qblackai.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method Not Allowed' });

  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and new password required' });

  try {
    await client.connect();
    const db = client.db('licenseDB');
    const users = db.collection('users');
    const codes = db.collection('verificationCodes');

    // Check if a valid verification code exists for this email
    const record = await codes.findOne({ email });
    if (!record) return res.status(400).json({ message: 'No verification record found. Please verify your email first.' });
    if (Date.now() > record.expires) {
      await codes.deleteOne({ email });
      return res.status(410).json({ message: 'Verification code expired. Please request a new one.' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password
    const updateResult = await users.updateOne(
      { email },
      { $set: { password: hashedPassword } }
    );

    if (updateResult.matchedCount === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete verification code after successful reset
    await codes.deleteOne({ email });

    return res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  } finally {
    await client.close();
  }
}
