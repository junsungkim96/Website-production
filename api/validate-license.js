// Import the MongoDB client connection helper
import clientPromise from '../lib/mongodb';

export default async function handler(req, res) {
  // Only allow POST requests to this API route
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  // Extract email and licenseKey from the request body
  const { email, licenseKey } = req.body;

  // Hardcoded list of valid email and license key combinations
  const allowedCredentials = [
    { email: 'junsungkim@qblackai.com', licenseKey: 'quantum25!' },
    { email: 'shawnhong@google.com', licenseKey: 'okaygoogle' },
  ];

  try {
    // Get connected MongoDB client
    const client = await clientPromise;

    // Select the database and collection
    const db = client.db('licenseDB');
    const collection = db.collection('usedLicenses');

    // Check if the license has already been used
    const alreadyUsed = await collection.findOne({ email, licenseKey });
    if (alreadyUsed) {
      return res.status(403).json({
        valid: false,
        message: 'This license has already been used.',
      });
    }

    // Check if provided credentials match any in the allowed list
    const isValid = allowedCredentials.find(
      (cred) => cred.email === email && cred.licenseKey === licenseKey
    );

    if (isValid) {
      // Save this license usage in the database with timestamp
      await collection.insertOne({ email, licenseKey, usedAt: new Date() });

      // Respond with a success message and download link
      return res.status(200).json({
        valid: true,
        downloadUrl: '/program/QuasarVision.exe',
      });
    } else {
      // If credentials are invalid, return unauthorized
      return res.status(401).json({
        valid: false,
        message: 'Invalid email or license key',
      });
    }
  } catch (error) {
    // Catch and log any unexpected server/database errors
    console.error('License validation failed:', error);
    return res.status(500).json({
      valid: false,
      message: 'Internal server error.',
    });
  }
}
