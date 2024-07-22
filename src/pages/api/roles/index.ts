import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import { authenticateToken } from "@/middleware/authMiddleware";
import Role from "@/models/Role";

export const config = {
  api: {
    bodyParser: true, // Enable body parsing
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();
  switch (req.method) {
    case "GET":
      if (req.query.id) {
        await handleGetByIdRequest(req, res);
      } else {
        await handleGetAllRequest(req, res);
      }
      break;
    case "POST":
      await handlePostRequest(req, res);
      break;
    case "PUT":
      await handlePutRequest(req, res);
      break;
    case "DELETE":
      await handleDeleteRequest(req, res);
      break;
    default:
      res.status(405).json({ success: false, error: "Method not allowed" });
      break;
  }
};

// Handle GET requests for all roles
const handleGetAllRequest = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const currentPage = Number(req.query.currentPage || 1);
    const pageLimit = Number(req.query.pageLimit || 10);
    const searchText = req.query.searchText || "";

    const query = {
      isDeleted: false,
      $or: [
        { roleName: { $regex: searchText, $options: "i" } },
        { department: { $regex: searchText, $options: "i" } },
      ],
    };

    const roles = await Role.find(query)
      .skip((currentPage - 1) * pageLimit)
      .limit(pageLimit);

    const totalCount = await Role.countDocuments(query);

    res.status(200).json({
      success: true,
      roles,
      totalCount,
    });
  } catch (error) {
    console.error("Failed to fetch roles:", error);
    res.status(500).json({ success: false, message: "Failed to fetch roles" });
  }
};

// Handle GET requests by ID
const handleGetByIdRequest = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id } = req.query;
  console.log({ id });

  if (!id) {
    return res
      .status(400)
      .json({ success: false, error: "Role ID is required" });
  }

  try {
    const role = await Role.findById(id);

    if (!role) {
      return res.status(404).json({ success: false, error: "Role not found" });
    }

    res.status(200).json({ success: true, role });
  } catch (error) {
    console.error("Error fetching role by ID:", error);
    res
      .status(500)
      .json({ success: false, error: "Error fetching role by ID" });
  }
};

// Handle POST requests
const handlePostRequest = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { roleName, department, roleLevel, loggedInUserId } = req.body;

    // Check for missing fields
    if (!roleName || !department || !roleLevel) {
      return res
        .status(400)
        .json({ success: false, error: "Missing required fields" });
    }

    // Check if already exists
    const existingRole = await Role.findOne({
      roleName,
      department,
      roleLevel,
    });

    if (existingRole) {
      return res
        .status(409)
        .json({ success: false, error: "Role already exists" });
    }

    // Create a new role
    const newRole = new Role({
      roleName,
      department,
      roleLevel,
      createdBy: loggedInUserId,
    });

    console.log({ newRole });

    const savedRole = await newRole.save();
    res.status(201).json({ success: true, data: savedRole });
  } catch (error) {
    console.error("Error creating role:", error);
    res.status(500).json({ success: false, error: "Error creating role" });
  }
};

// Handle PUT requests
const handlePutRequest = async (req:NextApiRequest,res: NextApiResponse) => {
  const { roleName, department, roleLevel, updatedBy, id } = req.body;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, error: "Role ID is required" });
  }

  try {
    const updatedRole = await Role.findByIdAndUpdate(
      id,
      { roleName, department, roleLevel, updatedBy },
      { new: true }
    );

    if (!updatedRole) {
      return res.status(404).json({ success: false, error: "Role not found" });
    }

    res.status(200).json({ success: true, data: updatedRole });
  } catch (error) {
    console.error("Error updating role:", error);
    res.status(500).json({ success: false, error: "Error updating role" });
  }
};

// Handle DELETE requests
const handleDeleteRequest = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id } = req.query;
  console.log({id});
  
  if (!id) {
    return res
      .status(400)
      .json({ success: false, error: "Role ID is required" });
  }

  try {
    const deletedRole = await Role.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );

    if (!deletedRole) {
      return res.status(404).json({ success: false, error: "Role not found" });
    }

    res.status(200).json({ success: true, data: deletedRole });
  } catch (error) {
    console.error("Error deleting role:", error);
    res.status(500).json({ success: false, error: "Error deleting role" });
  }
};

export default authenticateToken(handler);
