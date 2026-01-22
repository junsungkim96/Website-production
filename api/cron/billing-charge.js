// pages/api/billing-charge.js
import { MongoClient } from "mongodb";
import fetch from "node-fetch";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
// const SECRET_KEY = 'test_sk_vZnjEJeQVxywk0vOkv0ZrPmOoBN0';
const SECRET_KEY = process.env.SECRET_KEY;

const plans = {
  Trial: {
    name: 'Trial',
    priceUSD: 0,
  },
  Basic: {
    name: 'Basic',
    priceUSD: 499,
  },
  Pro: {
    name: 'Pro',
    priceUSD: 2499,
  },
};

async function getUSDtoKRWRate() {
  const res = await fetch("https://open.er-api.com/v6/latest/USD");
  const data = await res.json();
  return data.rates.KRW;
}

function calculateAmountKRW(planName, rate) {
  const plan = plans[planName];

  if (!plan) {
    throw new Error(`Invalid plan: ${planName}`);
  }

  const priceKRW = Math.round(plan.priceUSD * rate);
  const amount = Math.round(priceKRW * 1.1); // VAT 10%

  return amount;
}
export default async function handler(req, res) {
  if (req.headers['authorization'] !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

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

    const now = new Date();

    // nextBillingAt <= 현재시간인 유저만 결제
    const billingUsers = await users
      .find({
        billingKey: { $exists: true },
        nextBillingAt: { $lte: now },
        autoBilling: true
      })
      .toArray();

    console.log("Billing target users:", billingUsers.length);

    const rate = await getUSDtoKRWRate();
 
    if (!rate || rate <= 0) {
      throw new Error("Invalid exchange rate");
    }

    for (const user of billingUsers) {
      try {
        const authHeader =
          "Basic " + Buffer.from(SECRET_KEY + ":").toString("base64");

        const amount = calculateAmountKRW(user.plan, rate);

        const response = await fetch("https://api.tosspayments.com/v1/billing/" + user.billingKey,{
            method: "POST",
            headers: {
              Authorization: authHeader,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              amount: amount,
              customerKey: user.customerKey,
              orderId: "order_" + Date.now(),
              orderName: user.plan + " Subscription"
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

        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        const day = now.getDate();

        let nextMonth = new Date(year, month + 1, day);
        if (nextMonth.getDate() !== day){
          //월말 처리
          const corrected = new Date(year, month + 2, 0);
          nextMonth.setDate(corrected.getDate());
        }

        // 결제 성공 → expirationDate 갱신
        await users.updateOne(
          { _id: user._id },
          {
            $set: {
              expirationDate: nextMonth
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
