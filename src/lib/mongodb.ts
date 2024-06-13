import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";
console.log("MONGODB_URI", MONGODB_URI);

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

async function dbConnect(): Promise<any> {
  return mongoose.connect(MONGODB_URI).then(() => console.log("Connected!"));
}

export default dbConnect;
