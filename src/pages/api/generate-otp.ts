// pages/api/login.ts

import { NextApiRequest, NextApiResponse } from 'next';
import {  generateOTP, encryptOTP } from "@/utils/OTP";
import sendEmailWithOTP from '@/utils/sendEmail';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("API Route hit");

    if (req.method !== 'POST') {
        console.log("Invalid method");
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { email } = req.body;
    console.log("Request body:", req.body);

    if (!email) {
        console.log("Email is missing");
        return res.status(400).json({ message: 'Email is required' });
    }

    const otp =await generateOTP();
    try {
        await sendEmailWithOTP(email, otp);
        res.status(200).json({encryptOTP:await encryptOTP(otp)});
    } catch (error:any) {
        console.log('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send OTP', error: error });
    }
}
