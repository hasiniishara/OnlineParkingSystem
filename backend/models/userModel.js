const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, unique: true },
    roles: {type:[String], default:['Employee']}
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
