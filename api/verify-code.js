// 예: pages/api/verify.js
// 메모리 스토어 예시
const verificationStore = {}; // 실제는 Redis나 DB 추천

export default async function handler(req, res) {
  // CORS 헤더
  res.setHeader('Access-Control-Allow-Origin', 'https://www.qblackai.com'); // 개발용, 운영 시 도메인 제한
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Preflight 요청 처리
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, code } = req.body;
  if (!email || !code) {
    return res.status(400).json({ message: 'Email and code required' });
  }

  // 메모리 스토어에서 검증
  const record = verificationStore[email];
  if (!record) {
    return res.status(404).json({ message: 'No verification code found' });
  }

  if (Date.now() > record.expires) {
    delete verificationStore[email];
    return res.status(410).json({ message: 'Verification code expired' });
  }

  if (code !== record.code) {
    return res.status(401).json({ message: 'Invalid verification code' });
  }

  // 성공하면 삭제
  delete verificationStore[email];

  return res.status(200).json({ message: 'Email verified' });
}
