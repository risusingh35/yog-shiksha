// pages/api/users/index.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { encryptOTP, generateOTP } from '@/utils/OTP';
import sendEmailWithOTP from '@/utils/sendEmail';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
        const { email } = req.body;
      if (!email) {
        return res.status(400).json({ success: false, error: 'Email ID is required' });
      }

      const user = await User.findOne({email });
      if (!user) {
        return res.status(404).json({ success: false, error: 'The email you entered is not registered or incorrect. Please verify your email address.' });
      }

      const otp =await generateOTP();
    try {
        await sendEmailWithOTP(email, otp);
        res.status(200).json({user,encryptOTP:await encryptOTP(otp),message:`OTP successfully sent to ${email}`});
    } catch (error:any) {
        console.log('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send OTP', error: error });
    }
    } catch (error:any) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
