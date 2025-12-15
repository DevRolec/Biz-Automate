import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema(
  {
    userPhone: { type: String, index: true, required: true },
    step: { type: String, default: null }, // e.g. ORDER_BOTTYPE, ORDER_PACKAGE ...
    data: { type: Object, default: {} },
    flow: { type: String, default: null }, // e.g. "ORDER"
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 1000 * 60 * 60 * 4),
    }, // 4h
  },
  { timestamps: true }
);

// TTL index to auto-expire stale sessions
SessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model("Session", SessionSchema);
