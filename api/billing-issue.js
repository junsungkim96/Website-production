import fetch from 'node-fetch';

const SECRET_KEY = process.env.TOSS_SECRET_KEY;
// const SECRET_KEY = 'test_sk_vZnjEJeQVxywk0vOkv0ZrPmOoBN0';

export default async function handler(req, res) {
  const allowedOrigin = 'https://www.qblackai.com'

  res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { customerKey, authKey } = req.body;

  if (!customerKey || !authKey) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const authHeader = 'Basic ' + Buffer.from(SECRET_KEY + ':').toString('base64');

    const response = await fetch('https://api.tosspayments.com/v1/billing/authorizations/issue', {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ customerKey, authKey }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Billing API error:', data);
      return res.status(response.status).json({ error: data.message || 'Billing key issuance failed', data });
    }

    // 발급된 billingKey를 DB에 저장하거나 사용자와 매핑 가능
    res.status(200).json(data);

  } catch (err) {
    console.error('Billing key issuance failed:', err);
    res.status(500).json({ error: 'Billing key issuance failed' });
  }
}
