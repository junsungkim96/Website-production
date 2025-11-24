import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  const allowedOrigin = 'https://www.qblackai.com';

  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { email, billingKey, customerKey } = req.body;

  if (!email || !billingKey || !customerKey) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await client.connect();
    const db = client.db("licenseDB");
    const users = db.collection("users");

    await users.updateOne(
      { email },
      {
        $set: {
          billingKey,
          customerKey,
        }
      },
      { upsert: true } // 사용자가 없으면 새로 생성
    );

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("DB save error:", err);
    res.status(500).json({ error: "DB save error" });
  } finally {
    await client.close();
  }
}
