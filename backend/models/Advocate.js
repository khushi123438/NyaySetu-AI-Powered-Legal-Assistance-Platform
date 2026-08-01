import mongoose from "mongoose";

const AdvocateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  experience: { type: String, required: false },
  pincode: { type: String, required: false },
  role: { type: String, default: "Advocate" },

  
  specialization: { type: [String], required: false },

  mobile: { type: String, required: false },
  city: { type: String, required: false },
  state: { type: String, required: false },
  barId: { type: String, required: false }
}, { timestamps: true });


const Advocate = mongoose.model("Advocate", AdvocateSchema);
export default Advocate;
