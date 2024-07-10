// models/User.ts
import mongoose, { Schema, Document } from 'mongoose';

interface Address {
  country: string;
  state: string;
  city: string;
  addressLine1: string;
  pinCode: string;
}

interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
  contact: string;
  address: Address;
  profilePhoto?: Buffer;
  isActive: boolean;
  isActiveSubscription: boolean;
  deletedAt?: Date; 
  isDeleted: boolean;
 
}

const addressSchema = new Schema<Address>({
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  addressLine1: { type: String, required: true },
  pinCode: { type: String, required: true },
});

const userSchema: Schema = new Schema<IUser>({
  email: { type: String, required: true, unique: true, index: true },
  firstName: { type: String, required: true, index: true },
  lastName: { type: String, required: true, index: true },
  contact: { type: String, required: true, index: true },
  address: { type: addressSchema, required: true },
  profilePhoto: { type: Buffer },
  isActive: { type: Boolean, required: true, default: true },
  isActiveSubscription: { type: Boolean, default: false },
  deletedAt: { type: Date } ,
  isDeleted: { type: Boolean, default: false }
});

export default mongoose.models.User || mongoose.model<IUser>('User', userSchema);
