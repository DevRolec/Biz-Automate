import mongoose from "mongoose";
import dotenv from "dotenv";
import Lead from "../src/models/Lead.js";

dotenv.config();

const leads = [
  {
    phone: "2348012345678",
    name: "John Doe",
    email: "john@example.com",
    status: "NEW",
    lastIntent: "PRICING",
    lastMessage: "How much does the bot cost?",
  },
  {
    phone: "2348098765432",
    name: "Sarah Ahmed",
    email: "sarah@mail.com",
    status: "ENGAGED",
    lastIntent: "ORDER",
    lastMessage: "I want to order a WhatsApp bot",
  },
  {
    phone: "2347055512345",
    name: "Michael Obi",
    email: "mike@biz.com",
    status: "ORDERED",
    lastIntent: "CONFIRM_ORDER",
    lastMessage: "Confirm my order please",
  },
];

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  await Lead.deleteMany();
  await Lead.insertMany(leads);

  console.log("✅ Test leads inserted");
  process.exit(0);
};

run();
