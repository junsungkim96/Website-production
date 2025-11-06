import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  const allowedOrigin = "https://www.qblackai.com";

  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    await client.connect();
    const db = client.db("licenseDB");
    const users = db.collection("users");

    // 필요한 필드만 projection으로 조회
    const user = await users.findOne(
      { email },
      { projection: { plan: 1, expirationDate: 1, _id: 0 } }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const now = new Date();
    const expirationDate = user.expirationDate ? new Date(user.expirationDate) : null;
    let plan = user.plan || "Free Trial";

    // 만료일이 지나면 자동으로 plan을 free로 전환
    if (expirationDate && expirationDate < now && plan !== "Free Trial") {
      plan = "Free Trial";
      await users.updateOne(
        { email },
        { $set: { plan: "Free Trial" } }
      );
    }

    res.status(200).json({
      plan,
      expirationDate: expirationDate ? expirationDate.toISOString() : null,
    });

  } catch (error) {
    console.error("Error fetching plan:", error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    await client.close();
  }
}
