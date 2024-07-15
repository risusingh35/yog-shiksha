import { NextApiRequest, NextApiResponse } from "next";
import { verifyOTP } from "@/utils/OTP";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { enterOtp, encryptedOTP, loggedInUser } = req.body;

  try {
    const isOTPValid = await verifyOTP(enterOtp, encryptedOTP);

    if (isOTPValid) {
      const token = jwt.sign(
        { id: loggedInUser._id, email: loggedInUser.email },
        JWT_SECRET,
        { expiresIn: "1m" }
      );
      const refreshToken = jwt.sign(
        { id: loggedInUser._id, email: loggedInUser.email },
        REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
      );
      // For demonstration purposes, we'll store it in a cookie
    //   res.cookie("refreshToken", refreshToken, {
    //     httpOnly: true,
    //     secure: true,
    //     sameSite: "strict",
    //   });
      res.setHeader('Set-Cookie', `refreshToken=${refreshToken}; HttpOnly; Secure; SameSite=Strict`);
      return res.status(200).json({ token });
    } else {
      return res.status(401).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Failed to authenticate", error });
  }
}
