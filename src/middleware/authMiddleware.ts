import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import jwt from "jsonwebtoken";
import { setCookie, parseCookies } from "nookies";

const JWT_SECRET = process.env.JWT_SECRET || "";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "";
const message = "Your session/token has expired, please login again";

export const authenticateToken =
  (handler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Authorization header is missing" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      console.error("Token is missing");
      return res.status(401).json({ message: "Token is missing" });
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      console.error("Token is expired, trying to refresh it", error);
      const cookies = parseCookies({ req });
      const refreshToken = cookies.refreshToken;

      if (!refreshToken) {
        return res.status(401).json({ message: "Refresh token is missing" });
      }

      // Handle the refresh token
      return await handleRefreshToken(req, res, refreshToken, handler);
    }

    try {
      (req as any).user = decoded;
      console.log("Decoded token:", decoded);

      return handler(req, res);
    } catch (err) {
      console.error(message, err);
      return res.status(403).json({ message });
    }
  };

const handleRefreshToken = async (
  req: NextApiRequest,
  res: NextApiResponse,
  refreshToken: string,
  handler: NextApiHandler
) => {
  try {
    const decodedRefreshToken: any = jwt.verify(
      refreshToken,
      REFRESH_TOKEN_SECRET
    );
    const newToken = jwt.sign(
      { id: decodedRefreshToken.id, email: decodedRefreshToken.email },
      JWT_SECRET,
      { expiresIn: "1m" }
    );

    setCookie({ res }, "token", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 1, // 1 minute
    });

    // console.log("New token generated from refresh token:", newToken);

    return handler(req, res);
  } catch (err) {
    console.error(message, err);
    return res.status(403).json({ message });
  }
};
