import { MongoClient } from "mongodb";
import fetch from "node-fetch";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
// const SECRET_KEY = 'test_sk_vZnjEJeQVxywk0vOkv0ZrPmOoBN0';
const SECRET_KEY = process.env.SECRET_KEY;

export default async function handler(req, res) {
  const allowedOrigin = "https://www.qblackai.com";

  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method Not Allowed" });

  const { email, billingKey, amount, plan } = req.body;

  if (!email || !plan || !billingKey) {
    return res
      .status(400)
      .json({ message: "Email, plan, and billingKey are required" });
  }

  try {
    await client.connect();
    const db = client.db("licenseDB");
    const users = db.collection("users");
    const payments = db.collection("payments");

    const user = await users.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // TossPayments 빌링 결제
    const authHeader = "Basic " + Buffer.from(SECRET_KEY + ":").toString("base64");

    const billingRes = await fetch(
      `https://api.tosspayments.com/v1/billing/${billingKey}`,
      {
        method: "POST",
        headers: {
          Authorization: authHeader,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount,
          customerKey: user.customerKey,
          orderId: "order_" + Date.now(),
          orderName: plan,
        }),
      }
    );

    const text = await billingRes.text();
    let billingData;
    try {
      billingData = JSON.parse(text);
    } catch (err) {
      console.error("JSON parse error:", err);
      return res.status(500).json({ message: "Invalid Toss JSON response" });
    }

    if (!billingRes.ok) {
      console.error("Billing failed:", billingData);
      return res.status(400).json({ message: billingData });
    }

    // ✅ 결제 성공 → expirationDate 업데이트
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();

    let nextMonth = new Date(year, month + 1, day);
    if (nextMonth.getDate() !== day) {
      const corrected = new Date(year, month + 2, 0);
      nextMonth.setDate(corrected.getDate());
    }

    const expirationDate = nextMonth;

    const updateRes = await users.updateOne(
      { email },
      { $set: { plan, expirationDate } }
    );

    if (updateRes.modifiedCount === 0) {
      console.error("Failed to update plan for user:", email);
    }

    // ✅ 결제 이력 저장
    await payments.insertOne({
      userEmail: email,
      plan,
      amount,
      billingKey,
      billingData,
      createdAt: new Date(),
    });

    const paymentHistory = await payments
      .find({userEmail: email})
      .sort({createdAt: -1})
      .toArray();

    return res.status(200).json({
      message: "Billing succeeded, plan updated, payment recorded",
      plan,
      expirationDate,
      billingData,
      payments: paymentHistory
    });
  } catch (err) {
    console.error("Billing error:", err);
    return res.status(500).json({ message: err.message || "Internal server error" });
  } finally {
    await client.close();
  }
}