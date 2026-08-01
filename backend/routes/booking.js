import express from 'express';
import auth from '../middlewares/authMiddleware.js';
import { rejectCase } from "../controllers/hireController.js";
import Booking from '../models/Booking.js';
import Advocate from '../models/Advocate.js';

const router = express.Router();

router.delete("/reject/:id", auth, rejectCase);

router.post('/', auth, async (req, res) => {
    try {
        if (req.user.role !== "User") {
            return res.status(403).json({ message: "Only users can hire advocates" });
        }

        const { advocateId, caseType, description } = req.body;

        const advocate = await Advocate.findById(advocateId);
        if (!advocate) {
            return res.status(400).json({ message: "Advocate not found" });
        }

        const booking = new Booking({
            user: req.user.id,
            advocate: advocateId,
            caseType,
            description
        });

        await booking.save();

        res.status(200).json({ message: "Request sent successfully ✅", booking });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

router.get('/advocate', auth, async (req, res) => {
    try {
        if (req.user.role.toLowerCase() !== "advocate") {
            return res.status(403).json({ message: "Only advocates can access this" });
        }

        const bookings = await Booking.find({
            advocate: req.user.id,
            hiddenFor: { $ne: req.user.id },   // ⭐ add this
        })
            .populate("user", "name email mobile city state pincode")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            bookings
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});



router.get('/approved/:advocateId', auth, async (req, res) => {
    const { advocateId } = req.params;
    try {
        const bookings = await Booking.find({
            advocate: advocateId,
            status: "approved",
            hiddenFor: { $ne: advocateId }, // 👈 ye line add
        })
            .populate("user", "name email mobile");
        res.status(200).json({ success: true, bookings });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

router.get("/user/:userId", auth, async (req, res) => {
    try {
        const { userId } = req.params;

        const bookings = await Booking.find({
            user: userId,
            status: "approved",
            hiddenFor: { $ne: userId }, // 👈 ye line add
        })
            .populate("user", "name email")
            .populate("advocate", "name email mobile");

        res.json({
            success: true,
            bookings,
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
});

router.put("/approve/:id", auth, async (req, res) => {
    try {
        if (req.user.role.toLowerCase() !== "advocate") {
            return res.status(403).json({
                success: false,
                message: "Only advocate can approve"
            });
        }

        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found"
            });
        }

        booking.status = "approved";
        await booking.save();

        const populated = await Booking.findById(booking._id)
            .populate("user", "name email mobile city state pincode")
            .populate("advocate", "name email");

        res.json({
            success: true,
            booking: populated
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
});

router.put("/hide/:id", auth, async (req, res) => {
  try {

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (!booking.hiddenFor.includes(req.user.id)) {
      booking.hiddenFor.push(req.user.id);
      await booking.save();
    }

    res.json({
      success: true,
      message: "Request hidden",
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});
export default router;