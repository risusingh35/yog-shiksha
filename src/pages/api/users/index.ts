// pages/api/users/index.ts
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { authenticateToken } from "@/middleware/authMiddleware";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const users = await User.find({ isDeleted: false });
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  } else if (req.method === "DELETE") {
    try {
      const { userId } = req.body;

      if (!userId) {
        return res.status(400).json({ success: false, error: "User ID is required" });
      }

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ success: false, error: "User not found" });
      }

      const now = new Date();
      const formattedDateTime = now
        .toISOString()
        .replace(/[-:.T]/g, '_')
        .split('_')[0] + '_' + now.getHours() + '_' + now.getMinutes();

      user.email = `${user.email}_deletedAt_${formattedDateTime}`;
      user.isActive = false;
      user.isDeleted = true;
      user.deletedAt = now;

      await user.save();

      res.status(200).json({ success: true, data: user });
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  } else {
    res.status(405).json({ success: false, error: "Method not allowed" });
  }
};

export default authenticateToken(handler);
