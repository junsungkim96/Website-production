import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  // List of allowed email and license key combinations
  const allowedCredentials = [
    { email: 'junsungkim@qblackai.com', licenseKey: 'quantum25!' },
    { email: 'shawnhong@google.com', licenseKey: 'okaygoogle' },
  ];

  const { email, licenseKey } = req.body;

  // Path to the JSON file that stores used licenses
  const usedLicensesPath = path.join(process.cwd(), 'api', 'used-licenses.json');

  // Initialize or create the file if it doesn't exist
  if (!fs.existsSync(usedLicensesPath)) {
    fs.writeFileSync(usedLicensesPath, JSON.stringify([]));
  }

  // Load the list of already used licenses
  let usedLicenses = JSON.parse(fs.readFileSync(usedLicensesPath, 'utf-8'));

  // Check if the license has already been used
  const alreadyUsed = usedLicenses.some(
    (cred) => cred.email === email && cred.licenseKey === licenseKey
  );

  if (alreadyUsed) {
    return res.status(403).json({
      valid: false,
      message: 'This license has already been used.',
    });
  }

  // Validate credentials
  const match = allowedCredentials.find(
    (cred) => cred.email === email && cred.licenseKey === licenseKey
  );

  if (match) {
    // Mark license as used
    usedLicenses.push({ email, licenseKey });
    fs.writeFileSync(usedLicensesPath, JSON.stringify(usedLicenses, null, 2));

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
