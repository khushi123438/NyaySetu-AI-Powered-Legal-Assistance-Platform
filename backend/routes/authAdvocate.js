import express from "express";
import bcrypt from "bcryptjs";
import Advocate from "../models/Advocate.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { 
      name, email, password, experience, pincode, specialization, barId,
      mobile = "", city = "", state = "" 
    } = req.body; 

    if (!name || !email || !password || !experience || !pincode || !specialization || !barId) {
      return res.status(400).json({ success: false, message: "All required fields must be filled" });
    }

    const existing = await Advocate.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdv = new Advocate({
      name,
      email,
      password: hashedPassword,
      experience,
      pincode,
      specialization,
      barId,
      mobile,
      city,  
      state 
    });

    await newAdv.save();
    res.status(201).json({ success: true, message: "Advocate signup successful", advocate: newAdv });

  } catch (err) {
    console.error("Advocate signup error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


router.get("/all", async (req, res) => {
  try {
    const advocates = await Advocate.find();
    res.status(200).json({ success: true, advocates });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error fetching advocates" });
  }
});




export default router;
