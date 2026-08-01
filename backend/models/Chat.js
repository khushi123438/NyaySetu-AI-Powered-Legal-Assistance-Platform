import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
bookingId:{ type: mongoose.Schema.Types.ObjectId, ref:"Booking"},
sender:{ type: mongoose.Schema.Types.ObjectId, refPath:"senderType"},
receiver: { type: mongoose.Schema.Types.ObjectId, refPath: "receiverType", required: true },
receiverType: { type: String, enum: ["User", "Advocate"], required: true },
senderType:{ type:String, enum:["User","Advocate"], required:true},
message:{ type:String },
attachments:{ type:String, default:null },
createdAt:{ type:Date, default:Date.now }
});

ChatSchema.index({ bookingId:1, createdAt:1 });

export default mongoose.model("Chat", ChatSchema);