// Import the MongoDB client connection helper
import clientPromise from '../lib/mongodb.js';

export default async function handler(req, res) {
  // Only allow POST requests to this API route
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  // Extract email and licenseKey from the request body
  const { email, licenseKey } = req.body;

  try {
    // Get connected MongoDB client
    const client = await clientPromise;

    // Select the database and collection
    const db = client.db('licenseDB');
    const usedCollection = db.collection('usedLicenses');
    const allowedCollection = db.collection('allowedLicenses');

    // Check if the license has already been used
    const alreadyUsed = await usedCollection.findOne({ email, licenseKey });

    if (alreadyUsed) {
      return res.status(403).json({
        valid: false,
        message: 'This license has already been used.',
      });
    }

    // Check if provided credentials match any in the allowed list
    const isValid = await allowedCollection.findOne({email, licenseKey});

    if (isValid) {
      const validityDays = isValid.validity_days ?? 1;  // fallback to 1 if undefined

      // Save this license usage in the database with timestamp
      await usedCollection.insertOne({ 
        email, 
        licenseKey, 
        download_time: new Date(),
        validity_days: validityDays,
        hwid: null,
        is_activated: false,
        activation_time: null, 
      });

      // Respond with a success message and download link
      return res.status(200).json({
        valid: true,
        downloadUrl: 'https://8puowjmkndisb60h.public.blob.vercel-storage.com/QuasarVisionInstaller-D9tUu9a77W9qhAY5eq5T81nslzBh9l.zip',
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
