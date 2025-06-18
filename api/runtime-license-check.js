import clientPromise from '../lib/mongodb.js';
import crypto from 'crypto';

const LICENSE_VALIDITY_DAYS = 1;
// const LICENSE_VALIDITY_MINUTES = 10;

function hashHwid(hwid) {
    return crypto.createHash('sha256').update(hwid).digest('hex');
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ valid: false, message: 'Method Not Allowed' });
    }

    const { licenseKey, hwid } = req.body;

    if (!licenseKey || !hwid) {
        return res.status(400).json({ valid: false, message: 'Missing parameters' });
    }

    try {
        const client = await clientPromise;
        const db = client.db('licenseDB');
        const collection = db.collection('usedLicenses');

        const hashedHwid = hashHwid(hwid);
        const now = new Date();

        const license = await collection.findOne({ licenseKey });

        // License not found
        if (!license) {
            return res.status(401).json({ valid: false, message: 'License not found' });
        }

        // First activation
        if (!license.is_activated) {
            await collection.updateOne(
                { licenseKey },
                {
                    $set: {
                        hwid: hashedHwid,
                        is_activated: true,
                        activatedAt: now,
                    },
                }
            );

            const expireAt = new Date(now);
            expireAt.setDate(expireAt.getDate() + LICENSE_VALIDITY_DAYS);
			// const expireAt = new Date(now.getTime() + LICENSE_VALIDITY_MINUTES * 60 * 1000); // 3 minutes from now

            return res.status(200).json({
                valid: true,
                message: 'License activated',
                expireAt: expireAt.toISOString(),
            });
        }

        // Already activated - validate HWID
        if (license.hwid !== hashedHwid) {
            return res.status(403).json({
                valid: false,
                message: 'This license is used on another machine',
            });
        }

        // Check expiration
        // const expireAt = new Date(license.activatedAt);
        // expireAt.setDate(expireAt.getDate() + LICENSE_VALIDITY_DAYS);
		const expireAt = new Date(activatedAt.getTime() + LICENSE_VALIDITY_MINUTES * 60 * 1000);

        if (now > expireAt) {
            return res.status(403).json({
                valid: false,
                message: 'License expired',
            });
        }

        return res.status(200).json({
            valid: true,
            message: 'License valid',
            expireAt: expireAt.toISOString(),
        });

    } catch (err) {
        console.error('License validation error:', err);
        return res.status(500).json({ valid: false, message: 'Internal server error' });
    }
}
