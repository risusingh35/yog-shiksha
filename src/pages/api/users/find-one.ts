// pages/api/users/find-one.ts
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { encryptOTP, generateOTP } from "@/utils/OTP";
import sendEmailWithOTP from "@/utils/sendEmail";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    case "POST":
      await handlePostRequest(req, res);
      break;
    // case "PUT":
    //   await handlePutRequest(req, res);
    //   break;
    default:
      res.status(405).json({ success: false, error: "Method not allowed" });
      break;
  }
}

const handleGetRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;
  try {
    if (!id) {
      return res.status(400).json({ success: false, error: "ID is required" });
    }

    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ success: false, error: "Invalid User/Id" });
    }
    res
      .status(200)
      .json({ success: true, user, message: "User fetched successfully" });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const handlePostRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res
        .status(400)
        .json({ success: false, error: "Email ID is required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        error:
          "The email you entered is not registered or incorrect. Please verify your email address.",
      });
    }

    const otp = await generateOTP();
    try {
      await sendEmailWithOTP(email, otp);
      const encryptedOTP = await encryptOTP(otp);
      res.status(200).json({
        success: true,
        user,
        encryptedOTP,
        message: `OTP successfully sent to ${email}`,
      });
    } catch (error: any) {
      console.error("Error sending email:", error);
      res.status(500).json({ success: false, error: "Failed to send OTP" });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

