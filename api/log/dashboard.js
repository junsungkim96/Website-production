import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  // --- CORS ---
  const allowedOrigin = "https://www.qblackai.com";
  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    await client.connect();
    const db = client.db("licenseDB");
    const usersCollection = db.collection("users");
    const paymentsCollection = db.collection("payments");

    // Total users
    const totalUsers = await usersCollection.countDocuments({});

    // Signups aggregation per day
    const signupsAgg = await usersCollection.aggregate([
      { $project: { date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } } } },
      { $group: { _id: "$date", count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]).toArray();
    const signups = signupsAgg.map(s => ({ date: s._id, count: s.count }));

    // Paid users aggregation per day (unique users per day)
    const paidAgg = await paymentsCollection.aggregate([
      { 
        $project: { 
          date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          userEmail: 1
        } 
      },
      { $group: { _id: "$date", users: { $addToSet: "$userEmail" } } }, // unique users
      { $project: { date: "$_id", count: { $size: "$users" } } },
      { $sort: { date: 1 } }
    ]).toArray();

    const paidUsers = paidAgg.map(p => ({ date: p.date, count: p.count }));

    res.status(200).json({
      totalUsers,
      dau: 0,   // no longer tracking logins
      mau: 0,   // no longer tracking logins
      stickiness: 0,
      signups,
      paidUsers
    });

  } catch (error) {
    console.error("Dashboard API error:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  } finally {
    await client.close();
  }
}
