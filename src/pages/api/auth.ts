import { NextApiRequest, NextApiResponse } from 'next';
import { verifyOTP } from '@/utils/OTP';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET||""
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { enterOtp, encryptedOTP,loggedInUser } = req.body;
    console.log( JWT_SECRET,req.body);
    
    try {
        const isOTPValid = await verifyOTP(enterOtp, encryptedOTP);

        if (isOTPValid) {
            const token = jwt.sign({ id: loggedInUser._id, email: loggedInUser.email }, JWT_SECRET, { expiresIn: '1h' });
            return res.status(200).json({ token });
        } else {
            return res.status(401).json({ message: 'Invalid OTP' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Failed to authenticate', error });
    }
}
