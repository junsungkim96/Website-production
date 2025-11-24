import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  const allowedOrigin = "https://www.qblackai.com";
  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).json({ message: "Method Not Allowed" });

  const { email } = req.query;
  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const client = await clientPromise;
    const db = client.db("licenseDB");
    const payments = db.collection("payments");

    const paymentHistory = await payments
      .find({ userEmail: email })
      .sort({ createdAt: -1 }) // 최신순
      .toArray();

    res.status(200).json(paymentHistory);
  } catch (err) {
    console.error("Error fetching payments:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}