import { NextApiRequest, NextApiResponse } from 'next';
import { verifyOTP } from '@/utils/OTP';
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { enterOtp, encryptedOTP,email } = req.body;
    
    try {
        // Verify OTP (replace this with your OTP verification logic)
        const isOTPValid = await verifyOTP(enterOtp, encryptedOTP);

        if (isOTPValid) {
            // Generate JWT token
            const token = jwt.sign({ user: email }, 'your_secret_key', { expiresIn: '1h' });

            // Return token to the client
            return res.status(200).json({ token });
        } else {
            return res.status(401).json({ message: 'Invalid OTP' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Failed to authenticate', error });
    }
}
