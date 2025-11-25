import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  const allowedOrigin = 'https://www.qblackai.com';

  res.setHeader('Access-Control-Allow-Origin', allowedOrigin); // 개발 중에는 *로 허용
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    await client.connect();
    const db = client.db('licenseDB');
    const users = db.collection('users');

    const user = await users.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.isLoggedIn) {
      return res.status(400).json({ message: 'User is already logged out' });
    }

    // Update logout info
    await users.updateOne(
      { _id: user._id },
      {
        $set: {
          isLoggedIn: false,
        }
      }
    );

    // logout successful
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || 'Internal server error' });
  } finally {
    await client.close();
  }
}
