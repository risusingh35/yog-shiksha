// utils/sendEmail.ts

import nodemailer from 'nodemailer';

const sendEmailWithOTP = async (to: string, otp: string) => {
   // Create a Nodemailer transporter
   const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Send mail with defined transport object
  try {
    console.log('Email sending');
  return  await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: 'Login OTP',
      text: `Your OTP for login is: ${otp}`,
    });
    
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error(JSON.stringify(error));
  }
};

export default sendEmailWithOTP;
