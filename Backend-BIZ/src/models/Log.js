import mongoose from "mongoose";

const LogSchema = new mongoose.Schema(
  {
    type: String, // INFO | ERROR | WEBHOOK
    message: String,
    meta: Object,
  },
  { timestamps: true }
);

export default mongoose.model("Log", LogSchema);
