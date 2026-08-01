const express = require("express");
const router = express.Router();
const auth = require("../middlewares/authMiddleware");

const Booking = require("../models/Booking");

router.get("/clients", auth, async (req, res) => {
    try {
        if (req.user.role !== "advocate") {
            return res.status(403).json({ message: "Only advocates can access this" });
        }

        const bookings = await Booking.find({
            advocate: advocateId,
            status: "approved"
        })
            .populate("user", "name email mobile")
            .populate("advocate", "name email")
            .sort({ createdAt: -1 });

        res.json({ bookings });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
