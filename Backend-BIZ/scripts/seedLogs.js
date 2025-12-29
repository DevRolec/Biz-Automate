import mongoose from "mongoose";
import dotenv from "dotenv";
import Log from "../src/models/Log.js";

dotenv.config();

const seedLogs = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Log.deleteMany();

    await Log.insertMany([
      {
        phone: "2348098765432",
        type: "INCOMING",
        message: "I want to order a WhatsApp bot",
      },
      {
        phone: "2348098765432",
        type: "INTENT",
        intent: "ORDER",
      },
      {
        phone: "2347055512345",
        type: "OUTGOING",
        message: "Please confirm your order",
      },
      {
        phone: "2347055512345",
        type: "ORDER",
        meta: { orderId: "ORD12345" },
      },
    ]);

    console.log("✅ Logs seeded");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed error:", err);
    process.exit(1);
  }
};

seedLogs();
