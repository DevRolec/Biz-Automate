import mongoose from "mongoose";

const LogSchema = new mongoose.Schema(
  {
    phone: { type: String },
    type: {
      type: String,
      enum: ["INCOMING", "OUTGOING", "INTENT", "ORDER", "ERROR"],
      required: true,
    },
    message: { type: String },
    intent: { type: String },
    meta: { type: Object }, // flexible extra data
  },
  { timestamps: true }
);

export default mongoose.model("Log", LogSchema);
