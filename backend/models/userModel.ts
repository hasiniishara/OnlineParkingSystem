import mongoose, { Document } from 'mongoose';


//define user data type
export interface UserDocument extends Document {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  email?: string; 
  roles: string[];
}

//create user
const userSchema = new mongoose.Schema<UserDocument>(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    roles: { type: [String], default: ['Employee'] }
  },
  { timestamps: true }
);

export default mongoose.model<UserDocument>('User', userSchema);
