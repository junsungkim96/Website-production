import {MongoClient} from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  // --- CORS ---
  const allowedOrigin = "https://www.qblackai.com";
  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { userId, plan, timestamp, status, inputs } = req.body;

  // Required fields validation
  if (!userId || !plan || !timestamp || !status || !inputs) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    await client.connect();
    const db = client.db("licenseDB"); // UPDATED DB
    const logs = db.collection("simulationLogs");

    await logs.insertOne({
      userId,
			plan,
      timestamp: new Date(timestamp),
      status,
      inputs,
    });

    return res.status(201).json({ message: "Simulation logged" });

  } catch (error) {
    console.error("Simulation logging error:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  } finally {
    await client.close();
  }
}