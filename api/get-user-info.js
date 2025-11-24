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
    const db = client.db("licenseDB");
    const users = db.collection("users");

    const user = await users.findOne(
      { email },
      { projection: { _id: 0, email: 1, firstName: 1, lastName: 1, plan: 1, expirationDate: 1 } }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user info:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}