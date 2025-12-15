import mongoose from "mongoose";

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("MONGO_URI missing in .env");
  await mongoose.connect(uri, { dbName: "jbiz_bot" });
  console.log("✅ MongoDB connected");
};
