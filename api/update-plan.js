import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  const allowedOrigin = "https://www.qblackai.com";

  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { email, plan, paymentData } = req.body;
  console.log(paymentData);

  if (!email || !plan || !paymentData) {
    return res.status(400).json({ message: "Email and plan are required" });
  }

  try {
    await client.connect();
    const db = client.db("licenseDB");
    const users = db.collection("users");
    const payments = db.collection("payments");

    const user = await users.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 한 달 뒤의 expirationDate 계산
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();

    // 다음 달 날짜 계산
    const nextMonth = new Date(year, month + 1, day);

    // 만약 존재하지 않는 날짜라면 (예: 2월 30일), 그 달의 마지막 날로 조정
    if (nextMonth.getDate() !== day) {
      // setDate(0)은 "이전 달의 마지막 날"을 의미하므로,
      // 다음 달 첫날로 갔다가 하루 빼면 정확히 그 달의 마지막 날이 됨
      const corrected = new Date(year, month + 2, 0);
      nextMonth.setDate(corrected.getDate());
    }

    const expirationDate = nextMonth;

    // plan 및 만료일 업데이트
    const result = await users.updateOne(
      { email },
      {
        $set: {
          plan,
          expirationDate,
        },
      }
    );

    if (result.modifiedCount === 0) {
      return res.status(400).json({ message: "Failed to update plan" });
    }

    // payment-confirm 데이터 그대로 결제 기록 저장
    await payments.insertOne({
      userEmail: email,
      plan: plan,
      paymentData: {...paymentData},
      createdAt: new Date(),
    });

    res.status(200).json({
      message: "Plan updated and payment recorded successfully",
      plan,
      expirationDate,
    });
  } catch (error) {
    console.error("Error updating plan:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  } finally {
    await client.close();
  }
}
