import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import webhookRoutes from "./routes/webhookRoutes.js";
import { connectDB } from "./db/mongoose.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());

// Connect DB once on boot
connectDB().catch((e) => {
  console.error("Mongo connect error:", e);
  process.exit(1);
});

app.use("/webhook", webhookRoutes);

app.get("/", (req, res) =>
  res.send("JBiz Automations WhatsApp Bot is running 🚀")
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
