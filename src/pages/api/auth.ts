// pages/api/login.ts

import { NextApiRequest, NextApiResponse } from 'next';
import {   encryptOTP,verifyOTP } from "@/utils/OTP";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("API Route hit");

    if (req.method !== 'POST') {
        console.log("Invalid method");
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const {  enterOtp,encryptedOTP } = req.body;
    console.log("Request body:", req.body);
    try {
        let isLogin=await verifyOTP(enterOtp,encryptedOTP)

        res.status(200).json(isLogin);
    } catch (error:any) {
        console.log('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send OTP', error: error });
    }

}
