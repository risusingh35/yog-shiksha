// pages/api/refresh-token.ts
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key';

const generateAccessToken = (user: any) => {
  return jwt.sign(user, JWT_SECRET, { expiresIn: '15m' });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token is missing' });
  }

  try {
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    const accessToken = generateAccessToken({ id: (decoded as any).id, email: (decoded as any).email });

    return res.status(200).json({ accessToken });
  } catch (error) {
    return res.status(403).json({ message: 'Invalid refresh token' });
  }
}
