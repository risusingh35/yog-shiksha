// pages/api/users/index.ts
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import formidable from "formidable";
import { authenticateToken } from "@/middleware/authMiddleware";
export const config = {
  api: {
    bodyParser: false,
  },
};
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  switch (req.method) {
    case "GET":
      await handleGetRequest(req, res);
      break;
    case "DELETE":
      await handleDeleteRequest(req, res);
      break;
    // case "POST":
    //   await handlePostRequest(req, res);
    //   break;
    case "PUT":
      await handlePutRequest(req, res);
      break;
    default:
      res.status(405).json({ success: false, error: "Method not allowed" });
      break;
  }
};
const handleDeleteRequest = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res
        .status(400)
        .json({ success: false, error: "User ID is required" });
    }
    console.log({ id });
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const now = new Date();
    const formattedDateTime =
      now
        .toISOString()
        .replace(/[-:.T]/g, "_")
        .split("_")[0] +
      "_" +
      now.getHours() +
      "_" +
      now.getMinutes();

    user.email = `${user.email}_deletedAt_${formattedDateTime}`;
    user.isActive = false;
    user.isDeleted = true;
    user.deletedAt = now;

    await user.save();

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};
const handleGetRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Retrieve query parameters from request
    const currentPage = Number(req.query.currentPage || 1);
    const pageLimit = Number(req.query.pageLimit || 10);
    const searchText = req.query.searchText || "";

    // Construct query based on parameters
    const query = {
      isDeleted: false,
      $or: [
        { email: { $regex: searchText, $options: "i" } },
        { firstName: { $regex: searchText, $options: "i" } },
        { lastName: { $regex: searchText, $options: "i" } },
        { contact: { $regex: searchText, $options: "i" } },
        { "address.country": { $regex: searchText, $options: "i" } },
        { "address.state": { $regex: searchText, $options: "i" } },
        { "address.city": { $regex: searchText, $options: "i" } },
        { "address.addressLine1": { $regex: searchText, $options: "i" } },
        { "address.pinCode": { $regex: searchText, $options: "i" } },
      ],
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
      totalCount,
    });
  } catch (error) {
    // Handle any errors
    console.error("Failed to fetch users:", error);
    res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
};
const handlePutRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  const form = formidable({ multiples: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error("Formidable parsing error:", err);
      return res
        .status(400)
        .json({ success: false, error: "Error parsing form data" });
    }
    console.log(fields);

    const {
      id: [id],
      email: [email],
      firstName: [firstName],
      lastName: [lastName],
      contact: [contact],
      country: [country],
      state: [state],
      city: [city],
      isActive: [isActive],
      pinCode: [pinCode],
      addressLine1: [addressLine1],
    } = fields as any;
    console.log(id, "--------------");
    if (!id) {
      return res
        .status(400)
        .json({ success: false, error: "User ID is required" });
    }

    try {
      // Find user by ID
      const user = await User.findById(id);
      if (!user) {
        return res
          .status(404)
          .json({ success: false, error: "User not found" });
      }

      // Update user properties based on fields
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.email = email || user.email;
      user.contact = contact || user.contact;
      user.address = {
        country: country || user.address.country,
        state: state || user.address.state,
        city: city || user.address.city,
        addressLine1: addressLine1 || user.address.addressLine1,
        pinCode: pinCode || user.address.pinCode,
      };
      await user.save();
      res.status(200).json({ success: true, data: user });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ success: false, error: "Error updating user" });
    }
  });
};

export default authenticateToken(handler);
