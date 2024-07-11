// middleware/cookieParser.ts
import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import cookie from 'cookie';

export const parseCookies = (handler: NextApiHandler) => (req: NextApiRequest, res: NextApiResponse) => {
  const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
  (req as any).cookies = cookies;
  return handler(req, res);
};
