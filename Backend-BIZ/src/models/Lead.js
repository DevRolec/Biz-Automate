import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema(
  {
    phone: { type: String, index: true, unique: true },
    name: { type: String },
    email: { type: String },
    lastMessage: { type: String },
    lastIntent: { type: String },
    source: { type: String, default: "WHATSAPP" },
    status: {
      type: String,
      enum: ["NEW", "ENGAGED", "ORDERED"],
      default: "NEW",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Lead", LeadSchema);
