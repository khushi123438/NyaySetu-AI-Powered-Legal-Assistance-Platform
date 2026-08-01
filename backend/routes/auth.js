import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Advocate from "../models/Advocate.js";

const router = express.Router();


router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role, mobile, city, state, pincode } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Name, email, and password are required" });
    }

    if (role !== "User") {
      return res.status(400).json({ success: false, message: "Invalid role for this endpoint" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      mobile: mobile || "",
      city: city || "",
      state: state || "",
      pincode: pincode || ""
    });

    await newUser.save();
    res.status(201).json({ success: true, message: "User signup successful" });

  } catch (err) {
    console.error("User signup error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({ success: false, message: "Email, password, and role are required" });
    }

    let account;
    if (role === "User") account = await User.findOne({ email });
    else if (role === "Advocate") account = await Advocate.findOne({ email });
    else return res.status(400).json({ success: false, message: "Invalid role" });

    if (!account) return res.status(400).json({ success: false, message: "Account not found" });

    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ userId: account._id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({ success: true, token, role, user: account });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;