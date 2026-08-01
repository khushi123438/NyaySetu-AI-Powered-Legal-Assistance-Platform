import Hire from "../models/Booking.js";

export const rejectCase = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Hire.findById(id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Case not found"
      });
    }

    booking.status = "rejected";

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Case rejected successfully",
      booking
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};