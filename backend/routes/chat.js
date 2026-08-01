import express from "express";
import Chat from "../models/Chat.js";
import Booking from "../models/Booking.js";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();
const typingUsers = {};

const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowed = ["image/png", "image/jpeg", "application/pdf"];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only image or PDF allowed"));
    }
  }
});

router.post("/send", upload.single("attachments"), async (req, res) => {
  try {
    const { bookingId, sender, senderType, message } = req.body;

    if (!bookingId || !sender || !senderType) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    if (!message && !req.file) {
      return res.status(400).json({ success: false, message: "Message or attachment required" });
    }

    if (!mongoose.Types.ObjectId.isValid(bookingId) || !mongoose.Types.ObjectId.isValid(sender)) {
      return res.status(400).json({ success: false, message: "Invalid bookingId or sender" });
    }


    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ success: false, message: "Booking not found" });

    let receiver;
    if (senderType.toLowerCase() === "advocate") {
      receiver = booking.user;
    } else {
      receiver = booking.advocate;
    }

    const newMessage = new Chat({
      bookingId,
      sender,
      senderType,
      receiver,
      receiverType: senderType === "Advocate" ? "User" : "Advocate",
      message: message || "",
      attachments: req.file ? `/uploads/${req.file.filename}` : null
    });

    // 👇 Agar chat pehle hide thi to dobara visible ho jayegi
    await Booking.findByIdAndUpdate(bookingId, {
      $set: {
        hiddenFor: [],
      },
    });

    await newMessage.save();

    res.json({
      success: true,
      message: "Message sent",
      chat: newMessage
    });

  } catch (err) {
    console.error("Chat send error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});



router.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { bookingId } = req.query;

    if (!mongoose.Types.ObjectId.isValid(userId)) return res.status(400).json({ success: false, message: "Invalid userId" });

    const filter = { receiver: userId };
    if (bookingId) {
      if (!mongoose.Types.ObjectId.isValid(bookingId)) return res.status(400).json({ success: false, message: "Invalid bookingId" });
      filter.bookingId = bookingId;
    }

    const chats = await Chat.find(filter).sort({ createdAt: 1 });
    res.json({ success: true, chats });

  } catch (err) {
    console.error("User chat load error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


router.get("/:bookingId", async (req, res) => {
  try {
    const { bookingId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return res.status(400).json({ success: false, message: "Invalid bookingId" });
    }


    const chats = await Chat.find({ bookingId })
      .populate("sender", "name")
      .sort({ createdAt: 1 });
    res.json({ success: true, chats: chats || [] });

  } catch (err) {
    console.error("Chat load error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid message ID" });
    }

    await Chat.findByIdAndDelete(id);
    res.json({ success: true, message: "Message deleted" });

  } catch (err) {
    console.error("Chat delete error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


router.delete("/delete-all/:bookingId", async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { userId } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (!booking.hiddenFor.includes(userId)) {
      booking.hiddenFor.push(userId);
      await booking.save();
    }

    res.json({
      success: true,
      message: "Chat hidden successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
    });
  }
});



export default router;