// serverless function (Vercel)
import fetch from 'node-fetch';

const SECRET_KEY = 'test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6'; // 실제 환경에서는 .env 사용

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { paymentKey, orderId, amount } = req.body;

  if (!paymentKey || !orderId || !amount) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const authHeader = 'Basic ' + Buffer.from(SECRET_KEY + ':').toString('base64');

    // v2 결제 승인 API 호출
    const response = await fetch(`https://api.tosspayments.com/v2/payments/${paymentKey}/confirm`, {
      method: 'POST',
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount, orderId }),
    });

    const data = await response.json();
    return res.status(200).json({ data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Payment confirmation failed' });
  }
}
