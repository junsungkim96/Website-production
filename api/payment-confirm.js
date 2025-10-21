// api/payment-confirm.js
import fetch from 'node-fetch';

const SECRET_KEY = "test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6"; // 실제 환경에서는 .env 사용

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { paymentKey, orderId, amount } = req.body;

  if (!paymentKey || !orderId || !amount) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const authHeader = 'Basic ' + Buffer.from(SECRET_KEY + ':').toString('base64');

    // Toss v1 결제 승인 API 호출
    const response = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
      method: 'POST',
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ paymentKey, orderId, amount }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Toss Payment error:', data);
      return res.status(response.status).json({ error: data.message || 'Payment failed', data });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error('Payment confirmation failed:', err);
    res.status(500).json({ error: 'Payment confirmation failed' });
  }
}
