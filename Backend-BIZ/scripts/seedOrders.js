import mongoose from "mongoose";
import dotenv from "dotenv";
import Order from "../src/models/Order.js";

dotenv.config();

const seedOrders = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // optional clean slate (remove this if you don't want to delete existing orders)
    await Order.deleteMany({});

    const orders = [
      {
        userPhone: "2347055512345",
        fullName: "Michael Obi",
        email: "mike@biz.com",
        botType: "WHATSAPP_BOT",
        pkg: "PRO",
        quantity: 1,
        amount: 150000,
        status: "PENDING",
      },
      {
        userPhone: "2348012345678",
        fullName: "John Doe",
        email: "john@example.com",
        botType: "CRM_BOT",
        pkg: "BASIC",
        quantity: 2,
        amount: 100000,
        status: "PAID",
      },
      {
        userPhone: "2348098765432",
        fullName: "Sarah Ahmed",
        email: "sarah@mail.com",
        botType: "ECOM_BOT",
        pkg: "ENTERPRISE",
        quantity: 1,
        amount: 300000,
        status: "CANCELLED",
      },
    ];

    await Order.insertMany(orders);

    console.log("✅ Orders seeded successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed error:", err);
    process.exit(1);
  }
};

seedOrders();
