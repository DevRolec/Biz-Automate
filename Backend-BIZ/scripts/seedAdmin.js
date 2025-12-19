import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "../src/models/Admin.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const email = "admin@wapbiz.com";

    const exists = await Admin.findOne({ email });
    if (exists) {
      console.log("ℹ️ Admin already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("Admin123!", 10);

    await Admin.create({
      email,
      username: "wapbiz-admin",
      password: hashedPassword,
      status: "active",
    });

    console.log("✅ Admin created successfully");
    console.log("Email:", email);
    console.log("Password: Admin123!");

    process.exit(0);
  } catch (err) {
    console.error("❌ Seed error:", err);
    process.exit(1);
  }
};

seedAdmin();
