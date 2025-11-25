import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
	const allowedOrigin = "https://www.qblackai.com";

  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    await client.connect();
    const db = client.db("licenseDB");
    const users = db.collection("users");

    // autoBilling: false 로 수정
    const result = await users.updateOne(
      { email },
      { $set: { autoBilling: false } }
    );


    return res.status(200).json({ message: "Automatic billing disabled successfully" });

  } catch (error) {
    console.error("Error disabling auto billing:", error);
    return res.status(500).json({ message: "Internal server error" });

  } finally {
    await client.close();
  }
}
