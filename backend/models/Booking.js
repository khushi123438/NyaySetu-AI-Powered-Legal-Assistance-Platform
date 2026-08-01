
import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    advocate: { type: mongoose.Schema.Types.ObjectId, ref: 'Advocate' },
    caseType: String,
    description: String,
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },
    hiddenFor: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Booking', BookingSchema);
