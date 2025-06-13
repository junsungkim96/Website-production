export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const allowedCredentials = [
    { email: 'test@example.com', licenseKey: 'ABC123DEF456' },
    { email: 'user2@example.com', licenseKey: 'XYZ789LMN012' },
  ];

  const { email, licenseKey } = req.body;

  const match = allowedCredentials.find(
    (cred) => cred.email === email && cred.licenseKey === licenseKey
  );

  if (match) {
    return res.status(200).json({
      valid: true,
      downloadUrl: '/program/QuasarVision.exe',
    });
  } else {
    return res.status(401).json({
      valid: false,
      message: 'Invalid email or license key.',
    });
  }
}