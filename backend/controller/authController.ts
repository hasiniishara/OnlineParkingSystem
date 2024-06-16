import { Request, Response } from 'express';
import User, { UserDocument } from '../models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const mongoose = require("mongoose");


//User regristration fucntion

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


//User login function

export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  console.log(req.body);
  try {
    if (!password || !username)
      throw new Error("Password & username is required");
    const user: UserDocument | null = await User.findOne({ username });
    if (!user) {
      res.status(400).json({ message: "Credentials Invalid" });
      return; 
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Credentials Invalid" });
      return; 
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
    res.json({ token, role: user.roles });
  } catch (error: any) {
    console.error("Login error: ", error.message);
    res.status(400).json({ message: error.message });
  }
};

//View employee profile data
export const employeeProfile = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)){
      res.status(404).send(`No employee with id: ${id}`);
      return;
  }
  try {
    const employee = await User.findById(id);
    res.status(200).json(employee);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};




interface DecodedToken {
  id: string;
  roles: string[];
}

export const verifyToken = async (req: Request, res: Response): Promise<Response> => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
    return res.status(200).json({ message: "Token is valid", user: { id: decoded.id, roles: decoded.roles } });
  } catch (error: any) {
    return res.status(401).json({ message: error.message });
  }
};