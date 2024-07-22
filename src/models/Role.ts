import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./User"; // Import IUser for type checking

interface IRole extends Document {
  roleName: string;
  roleLevel: string;
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  createdBy: IUser["_id"]; // Reference to User ID
  updatedAt: Date;
  updatedBy: IUser["_id"]; // Reference to User ID
  deletedBy?: IUser["_id"]; // Reference to User ID
}

const roleSchema: Schema = new Schema<IRole>({
  roleName: { type: String, required: true, unique: true, index: true },
  roleLevel: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
  deletedAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  updatedAt: { type: Date, default: Date.now },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  deletedBy: { type: Schema.Types.ObjectId, ref: 'User' }
});

// Middleware to update the `updatedAt` field on document update
roleSchema.pre('save', function(next) {
  if (this.isModified()) {
    this.updatedAt = new Date();
  }
  next();
});

export default mongoose.models.Role || mongoose.model<IRole>("Role", roleSchema);
