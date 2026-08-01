import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import User from "../models/User.js";
import Advocate from "../models/Advocate.js";

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const { id, role } = req.user;

    if (role === "User") {
      const user = await User.findById(id).select("-password");
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
      return res.json({ success: true, profile: user });
    }

    if (role === "Advocate") {
      const advocate = await Advocate.findById(id).select("-password");
      if (!advocate) {
        return res.status(404).json({ success: false, message: "Advocate not found" });
      }
      return res.json({ success: true, profile: advocate });
    }

    res.status(400).json({ success: false, message: "Invalid role" });
  } catch (err) {
    console.error("Profile error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
