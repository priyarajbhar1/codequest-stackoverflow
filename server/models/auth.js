import mongoose from "mongoose";

const userschema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  about: { type: String },
  tags: { type: [String] },
  joinDate: { type: Date, default: Date.now },

  // ⭐ Reward Points System
  points: { 
    type: Number,
    default: 0
  }
});

export default mongoose.model("user", userschema);