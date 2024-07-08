import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false, // Disable body parsing, as we'll handle it with formidable
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  if (req.method === "POST") {
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
      // console.log({ err });
      // console.log({ fields });
      // console.log({ files });

      if (err) {
        return res.status(400).json({ success: false, error: err.message });
      }

      try {
        const {
          email: [email],
          firstName: [firstName],
          lastName: [lastName],
          contact: [contact],
          country: [country],
          state: [state],
          city: [city],
          isActive: [isActive],
        } = fields as any;

        const profilePhoto = files?.profilePhoto;

        const newUser = new User({
          email,
          firstName,
          lastName,
          contact,
          address: {
            country,
            state,
            city,
          },
          profilePhoto,
          isActive,
        });

        await newUser.save();
    
        res.status(201).json({ success: true, data: newUser });
      } catch (error) {
       
        res.status(400).json({ success: false, error });
      }
    });
  } else {
    res.status(405).json({ success: false, error: "Method not allowed" });
  }
}