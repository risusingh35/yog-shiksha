// pages/api/users/index.ts
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import { authenticateToken } from "@/middleware/authMiddleware";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  if (req.method === "GET") {
    // try {
    //   const users = await User.find({ isDeleted: false });
    //   res.status(200).json({ success: true, data: users });
    // } catch (error) {
    //   res.status(400).json({ success: false, error });
    // }
    try {
      // Retrieve query parameters from request
      const currentPage = Number(req.query.currentPage || 1);
      const pageLimit = Number(req.query.pageLimit || 10);
      const searchText = req.query.searchText || '';
  
      // Construct query based on parameters
      const query = {
        isDeleted: false,
        $or: [
          { email: { $regex: searchText, $options: 'i' } },
          { firstName: { $regex: searchText, $options: 'i' } },
          { lastName: { $regex: searchText, $options: 'i' } },
          { contact: { $regex: searchText, $options: 'i' } },
          { 'address.country': { $regex: searchText, $options: 'i' } },
          { 'address.state': { $regex: searchText, $options: 'i' } },
          { 'address.city': { $regex: searchText, $options: 'i' } },
          { 'address.addressLine1': { $regex: searchText, $options: 'i' } },
          { 'address.pinCode': { $regex: searchText, $options: 'i' } }
        ]
      };
  
      // Fetch users from database based on query and pagination
      const users = await User.find(query)
        .skip((currentPage - 1) * pageLimit)
        .limit(pageLimit);
  
      // Count total users matching the query (for pagination)
      const totalCount = await User.countDocuments(query);
  
      // Respond with success and data
      res.status(200).json({
        success: true,
        users,
        totalCount
      });
    } catch (error) {
      // Handle any errors
      console.error("Failed to fetch users:", error);
      res.status(500).json({ success: false, message: "Failed to fetch users" });
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
