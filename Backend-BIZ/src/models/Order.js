import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userPhone: { type: String, index: true, required: true },
    botType: { type: String, required: true }, // WHATSAPP_BOT | CRM_BOT | ECOM_BOT
    pkg: { type: String, required: true }, // BASIC | PRO | ENTERPRISE
    quantity: { type: Number, required: true, min: 1 },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    notes: { type: String },
    currency: { type: String, default: process.env.CURRENCY || "NGN" },
    amount: { type: Number, required: true }, // total in Naira
    status: { type: String, default: "PENDING" }, // PENDING | PAID | CANCELLED
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
