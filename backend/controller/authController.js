const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const register = async (req, res) => {
  const { firstname, lastname, username, password, email, roles } = req.body;

  try {
    if (!password) throw new Error("Password is required");
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ password: hashedPassword, firstname, lastname, username, email, roles });
    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Registration error: ", error.message);
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!password || !username)
      throw new Error("Password & username is required");
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Credentials Invalid" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Credentials Invalid" });

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
  } catch (error) {
    console.error("Login error: ", error.message);
    res.status(400).json({ message: error.message });
  }
};



module.exports = { register, login };
