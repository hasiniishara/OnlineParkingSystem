import { Request, Response } from 'express';
import User, { UserDocument } from '../models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response): Promise<void> => {
  const { firstname, lastname, username, password, email, roles } = req.body;

  try {
    if (!password) throw new Error("Password is required");
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ password: hashedPassword, firstname, lastname, username, email, roles });
    res.status(201).json({ message: "Registration successful" });
  } catch (error: any) {
    console.error("Registration error: ", error.message);
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  try {
    if (!password || !username)
      throw new Error("Password & username is required");
    const user: UserDocument | null = await User.findOne({ username });
    if (!user) {
      res.status(400).json({ message: "Credentials Invalid" });
      return; // Ensure no further code execution after sending response
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Credentials Invalid" });
      return; // Ensure no further code execution after sending response
    }

    if (!process.env.JWT_SECRET) throw new Error("JWT secret is not defined");

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        roles: user.roles
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error: any) {
    console.error("Login error: ", error.message);
    res.status(400).json({ message: error.message });
  }
};
