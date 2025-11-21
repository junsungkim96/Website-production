// pages/api/billing-charge.js
import { MongoClient } from "mongodb";
import fetch from "node-fetch";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const SECRET_KEY = 'test_sk_vZnjEJeQVxywk0vOkv0ZrPmOoBN0';

export default async function handler(req, res) {
  const allowedOrigin = 'https://www.qblackai.com';

  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 보안: 스케줄러만 실행하도록 제한 (POST only)
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    await client.connect();
    const db = client.db("licenseDB");
    const users = db.collection("users");
    console.log('Connected!');

    const now = new Date();

    // nextBillingAt <= 현재시간인 유저만 결제
    const billingUsers = await users
      .find({
        billingKey: { $exists: true },
        nextBillingAt: { $lte: now }
      })
      .toArray();

    console.log("Billing target users:", billingUsers.length);

    for (const user of billingUsers) {
      try {
        const authHeader =
          "Basic " + Buffer.from(SECRET_KEY + ":").toString("base64");

        const response = await fetch("https://api.tosspayments.com/v1/billing/" + user.billingKey,{
            method: "POST",
            headers: {
              Authorization: authHeader,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              amount: 10000, // ❗ 원하는 가격
              customerKey: user.customerKey,
              orderId: "order_" + Date.now(),
              orderName: "Pro Subscription"
            }),
          }
        );

        const text = await response.text(); // JSON이 아닐 수도 있으니 text로 먼저 확인
        console.log("TossPayments response:", text);

        let data;
        try {
          data = JSON.parse(text);
        } catch(e) {
          console.error("Failed to parse TossPayments JSON:", e);
          continue;
        }

        if (!response.ok) {
          console.error("Billing failed:", data);
          continue;
        }

        // 결제 성공 → nextBillingAt 갱신
        await users.updateOne(
          { _id: user._id },
          {
            $set: {
              lastPaymentAt: new Date(),
              nextBillingAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            }
          }
        );

        console.log(`User ${user.email} billing success`);
      } catch (err) {
        console.error("Single user billing error:", err);
      }
    }

    res.status(200).json({ success: true, processed: billingUsers.length });
  } catch (err) {
    console.error("Billing process error:", err);
    res.status(500).json({ error: "Billing failed" });
  } finally {
    await client.close();
  }
}
