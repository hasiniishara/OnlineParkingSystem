import mongoose, { Document } from 'mongoose';

export interface UserDocument extends Document {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  email?: string; // Make email optional
  roles: string[];
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, unique: true },
    roles: { type: [String], default: ['Employee'] }
  },
  { timestamps: true }
);

export default mongoose.model<UserDocument>('User', userSchema);
