import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { setCookie, parseCookies } from "nookies";

const JWT_SECRET = process.env.JWT_SECRET || "";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "";
const message = "Your session/token has expired, please login again";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: "Refresh token is missing" });
  }

  try {
    const decodedRefreshToken: any = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    const newToken = jwt.sign(
      { id: decodedRefreshToken.id, email: decodedRefreshToken.email },
      JWT_SECRET,
      { expiresIn: "10m" }
    );

    setCookie({ res }, "token", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 10, // 10 minutes
    });

    return res.status(200).json({ token: newToken });
  } catch (err) {
    console.error(message, err);
    return res.status(403).json({ message });
  }
}
